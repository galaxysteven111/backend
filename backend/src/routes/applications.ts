import { Router, Response } from 'express';
import { z } from 'zod';
import db from '../config/database';
import { authenticate, AuthRequest } from '../middleware/auth';
import { createNotification } from './notifications';

const router = Router();

const applySchema = z.object({
  food_box_id: z.string().uuid('無效的飯盒ID'),
  message: z.string().max(1000).optional().default(''),
  quantity_requested: z.number().int().min(1).max(100).default(1),
});

// 申請飯盒
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const parsed = applySchema.safeParse(req.body);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message || '輸入驗證失敗';
      return res.status(400).json({ error: firstError });
    }

    const { food_box_id, message, quantity_requested } = parsed.data;

    // 檢查飯盒是否存在且可用
    const foodBox = await db('food_boxes').where({ id: food_box_id }).select('id', 'status', 'donor_id', 'title').first();
    if (!foodBox) {
      return res.status(404).json({ error: '飯盒不存在' });
    }

    if (foodBox.status !== 'available') {
      return res.status(400).json({ error: '該飯盒不可申請' });
    }

    if (foodBox.donor_id === req.userId) {
      return res.status(400).json({ error: '不能申請自己的飯盒' });
    }

    // 檢查是否已申請
    const existingApplication = await db('applications')
      .where({
        food_box_id,
        recipient_id: req.userId
      })
      .select('id')
      .first();

    if (existingApplication) {
      return res.status(400).json({ error: '您已經申請過這個飯盒' });
    }

    const [application] = await db('applications')
      .insert({
        food_box_id,
        recipient_id: req.userId,
        message,
        quantity_requested
      })
      .returning('*');

    // Notify the donor about the new application
    const applicant = await db('users').where({ id: req.userId }).select('name').first();
    await createNotification({
      user_id: foodBox.donor_id,
      type: 'application_received',
      title: '收到新的飯盒申請',
      body: `${applicant?.name || '有人'}申請了您的飯盒「${foodBox.title}」`,
      related_food_box_id: food_box_id,
      related_application_id: application.id,
    });

    res.status(201).json({
      message: '申請成功',
      application
    });
  } catch (error: any) {
    console.error('申請飯盒錯誤:', error);
    res.status(500).json({ error: '申請失敗' });
  }
});

// 獲取我的申請列表
router.get('/my-applications', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const applications = await db('applications')
      .select(
        'applications.id',
        'applications.food_box_id',
        'applications.status',
        'applications.message',
        'applications.quantity_requested',
        'applications.created_at',
        'food_boxes.title',
        'food_boxes.pickup_address',
        'food_boxes.pickup_time_start',
        'food_boxes.pickup_time_end',
        db.raw('users.name as donor_name')
      )
      .join('food_boxes', 'applications.food_box_id', 'food_boxes.id')
      .join('users', 'food_boxes.donor_id', 'users.id')
      .where('applications.recipient_id', req.userId)
      .orderBy('applications.created_at', 'desc');

    res.json({ applications });
  } catch (error: any) {
    console.error('獲取申請列表錯誤:', error);
    res.status(500).json({ error: '獲取申請列表失敗' });
  }
});

// 獲取我的飯盒的申請列表（捐贈者視角）
router.get('/my-food-boxes/:foodBoxId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { foodBoxId } = req.params;

    // 檢查飯盒是否屬於當前用戶
    const foodBox = await db('food_boxes').where({ id: foodBoxId, donor_id: req.userId }).select('id').first();
    if (!foodBox) {
      return res.status(404).json({ error: '飯盒不存在或無權限' });
    }

    const applications = await db('applications')
      .select(
        'applications.*',
        db.raw('users.name as recipient_name'),
        db.raw('users.avatar_url as recipient_avatar'),
        db.raw('users.phone as recipient_phone')
      )
      .join('users', 'applications.recipient_id', 'users.id')
      .where('applications.food_box_id', foodBoxId)
      .orderBy('applications.created_at', 'desc');

    res.json({ applications });
  } catch (error: any) {
    console.error('獲取申請列表錯誤:', error);
    res.status(500).json({ error: '獲取申請列表失敗' });
  }
});

// 批准/拒絕申請
router.patch('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: '無效的狀態' });
    }

    // 獲取申請信息
    const application = await db('applications')
      .join('food_boxes', 'applications.food_box_id', 'food_boxes.id')
      .where('applications.id', id)
      .select('applications.*', 'food_boxes.donor_id')
      .first();

    if (!application) {
      return res.status(404).json({ error: '申請不存在' });
    }

    if (application.donor_id !== req.userId) {
      return res.status(403).json({ error: '無權限操作此申請' });
    }

    // 更新申請狀態
    const [updated] = await db('applications')
      .where({ id })
      .update({
        status,
        approved_at: status === 'approved' ? new Date() : null
      })
      .returning('*');

    // 如果批准，更新飯盒狀態
    if (status === 'approved') {
      await db('food_boxes')
        .where({ id: application.food_box_id })
        .update({ status: 'reserved' });
    }

    // Notify the recipient about the status change
    const foodBox = await db('food_boxes').where({ id: application.food_box_id }).select('title').first();
    const statusText = status === 'approved' ? '已被批准' : '已被拒絕';
    await createNotification({
      user_id: application.recipient_id,
      type: status === 'approved' ? 'application_approved' : 'application_rejected',
      title: `飯盒申請${statusText}`,
      body: `您對「${foodBox?.title || '飯盒'}」的申請${statusText}`,
      related_food_box_id: application.food_box_id,
      related_application_id: id,
    });

    res.json({
      message: `申請已${status === 'approved' ? '批准' : '拒絕'}`,
      application: updated
    });
  } catch (error: any) {
    console.error('更新申請狀態錯誤:', error);
    res.status(500).json({ error: '更新申請狀態失敗' });
  }
});

export default router;
