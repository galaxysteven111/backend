import { Router, Response } from 'express';
import db from '../config/database';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// Get notifications for current user
router.get('/', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { limit = 20, offset = 0 } = req.query;

    const notifications = await db('notifications')
      .where('user_id', req.userId)
      .orderBy('created_at', 'desc')
      .limit(Math.min(Math.max(1, Number(limit) || 20), 100))
      .offset(Math.max(0, Number(offset) || 0));

    res.json({ notifications });
    return;
  } catch (error: any) {
    console.error('獲取通知錯誤:', error);
    res.status(500).json({ error: '獲取通知失敗' });
    return;
  }
});

// Get unread count
router.get('/unread-count', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const [{ count }] = await db('notifications')
      .where({ user_id: req.userId, is_read: false })
      .count('id as count');

    res.json({ count: Number(count) });
    return;
  } catch (error: any) {
    console.error('獲取未讀數量錯誤:', error);
    res.status(500).json({ error: '獲取未讀數量失敗' });
    return;
  }
});

// Mark notification as read
router.patch('/:id/read', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const notification = await db('notifications')
      .where({ id, user_id: req.userId })
      .first();

    if (!notification) {
      res.status(404).json({ error: '通知不存在' });
      return;
    }

    await db('notifications').where({ id }).update({ is_read: true });

    res.json({ message: '已標記為已讀' });
    return;
  } catch (error: any) {
    console.error('標記通知錯誤:', error);
    res.status(500).json({ error: '標記通知失敗' });
    return;
  }
});

// Mark all as read
router.patch('/read-all', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await db('notifications')
      .where({ user_id: req.userId, is_read: false })
      .update({ is_read: true });

    res.json({ message: '已全部標記為已讀' });
    return;
  } catch (error: any) {
    console.error('標記全部已讀錯誤:', error);
    res.status(500).json({ error: '標記全部已讀失敗' });
    return;
  }
});

export default router;

// Helper to create a notification (used by other routes)
export async function createNotification(params: {
  user_id: string;
  type: string;
  title: string;
  body: string;
  related_food_box_id?: string;
  related_application_id?: string;
}) {
  try {
    await db('notifications').insert(params);
  } catch (error) {
    console.error('創建通知錯誤:', error);
  }
}
