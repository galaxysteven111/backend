import { Router, Response } from 'express';
import { z } from 'zod';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
import db from '../config/database';
import { authenticate, optionalAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// Multer configuration for image uploads
const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const name = crypto.randomBytes(16).toString('hex');
    cb(null, `${name}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('只允許上傳 JPG、PNG 或 WebP 格式的圖片'));
    }
  },
});

const HONG_KONG_DISTRICTS = [
  '中西區', '東區', '南區', '灣仔區',
  '九龍城區', '觀塘區', '深水埗區', '黃大仙區', '油尖旺區',
  '離島區', '葵青區', '北區', '西貢區', '沙田區', '大埔區', '荃灣區', '屯門區', '元朗區'
];

const createFoodBoxSchema = z.object({
  title: z.string().min(1, '請提供標題').max(200).trim(),
  description: z.string().max(2000).optional().default(''),
  quantity: z.number().int().min(1, '數量至少為1').max(1000),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  district: z.string().refine(val => HONG_KONG_DISTRICTS.includes(val), '無效的地區'),
  pickup_address: z.string().min(1, '請提供取餐地址').max(500).trim(),
  pickup_time_start: z.string().min(1, '請提供取餐開始時間'),
  pickup_time_end: z.string().min(1, '請提供取餐結束時間'),
  contact_method: z.enum(['message', 'phone', 'both']).default('message'),
  images: z.array(z.string().url()).max(5).optional(),
});

// 獲取所有可用的飯盒（支持篩選）
router.get('/', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const {
      district,
      search,
      status = 'available',
      lat,
      lng,
      radius = 5, // 默認5公里範圍
      limit = 20,
      offset = 0
    } = req.query;

    let query = db('food_boxes')
      .select(
        'food_boxes.id',
        'food_boxes.title',
        'food_boxes.description',
        'food_boxes.quantity',
        'food_boxes.status',
        'food_boxes.latitude',
        'food_boxes.longitude',
        'food_boxes.district',
        'food_boxes.pickup_address',
        'food_boxes.pickup_time_start',
        'food_boxes.pickup_time_end',
        'food_boxes.images',
        'food_boxes.created_at',
        db.raw('users.name as donor_name'),
        db.raw('users.avatar_url as donor_avatar')
      )
      .join('users', 'food_boxes.donor_id', 'users.id')
      .where('food_boxes.status', status)
      .orderBy('food_boxes.created_at', 'desc')
      .limit(Math.min(Math.max(1, Number(limit) || 20), 100))
      .offset(Math.max(0, Number(offset) || 0));

    // 文本搜索
    if (search && typeof search === 'string' && search.trim()) {
      const searchTerm = `%${search.trim()}%`;
      query = query.where(function() {
        this.whereILike('food_boxes.title', searchTerm)
          .orWhereILike('food_boxes.description', searchTerm)
          .orWhereILike('food_boxes.pickup_address', searchTerm);
      });
    }

    // 地區篩選
    if (district) {
      query = query.where('food_boxes.district', district);
    }

    // 地理位置篩選（如果提供了坐標）
    if (lat && lng) {
      const latNum = Number(lat);
      const lngNum = Number(lng);
      const radiusKm = Number(radius);
      
      // 使用 Haversine 公式計算距離（簡化版）
      query = query.whereRaw(`
        (6371 * acos(
          cos(radians(?)) * 
          cos(radians(food_boxes.latitude)) * 
          cos(radians(food_boxes.longitude) - radians(?)) + 
          sin(radians(?)) * 
          sin(radians(food_boxes.latitude))
        )) <= ?
      `, [latNum, lngNum, latNum, radiusKm]);
    }

    const foodBoxes = await query;

    res.json({ foodBoxes });
  } catch (error: any) {
    console.error('獲取飯盒列表錯誤:', error);
    res.status(500).json({ error: '獲取飯盒列表失敗' });
  }
});

// 獲取單個飯盒詳情
router.get('/:id', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const foodBox = await db('food_boxes')
      .select(
        'food_boxes.*',
        db.raw('users.name as donor_name'),
        db.raw('users.avatar_url as donor_avatar'),
        db.raw('users.phone as donor_phone')
      )
      .join('users', 'food_boxes.donor_id', 'users.id')
      .where('food_boxes.id', id)
      .first();

    if (!foodBox) {
      return res.status(404).json({ error: '飯盒不存在' });
    }

    // 如果用戶已登錄，檢查是否已申請
    if (req.userId) {
      const application = await db('applications')
        .where({
          food_box_id: id,
          recipient_id: req.userId
        })
        .first();
      
      foodBox.user_application = application || null;
    }

    res.json({ foodBox });
  } catch (error: any) {
    console.error('獲取飯盒詳情錯誤:', error);
    res.status(500).json({ error: '獲取飯盒詳情失敗' });
  }
});

// 創建飯盒（需要認證）
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const parsed = createFoodBoxSchema.safeParse(req.body);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message || '輸入驗證失敗';
      return res.status(400).json({ error: firstError });
    }

    const { title, description, quantity, latitude, longitude, district, pickup_address, pickup_time_start, pickup_time_end, contact_method, images } = parsed.data;

    const [foodBox] = await db('food_boxes')
      .insert({
        donor_id: req.userId,
        title,
        description,
        quantity,
        latitude,
        longitude,
        district,
        pickup_address,
        pickup_time_start,
        pickup_time_end,
        contact_method,
        images: images ? JSON.stringify(images) : null
      })
      .returning('*');

    res.status(201).json({
      message: '飯盒發布成功',
      foodBox
    });
  } catch (error: any) {
    console.error('創建飯盒錯誤:', error);
    res.status(500).json({ error: '發布飯盒失敗' });
  }
});

// 更新飯盒（僅限捐贈者本人）
router.patch('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    // 檢查飯盒是否存在且屬於當前用戶
    const foodBox = await db('food_boxes').where({ id, donor_id: req.userId }).select('id').first();
    if (!foodBox) {
      return res.status(404).json({ error: '飯盒不存在或無權限' });
    }

    // 只允許更新特定欄位，防止 mass assignment
    const allowedFields = ['title', 'description', 'quantity', 'latitude', 'longitude', 'district', 'pickup_address', 'pickup_time_start', 'pickup_time_end', 'contact_method', 'images'];
    const updates: Record<string, any> = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = field === 'images' ? JSON.stringify(req.body[field]) : req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: '沒有提供要更新的欄位' });
    }

    const [updated] = await db('food_boxes')
      .where({ id })
      .update(updates)
      .returning('*');

    res.json({
      message: '飯盒更新成功',
      foodBox: updated
    });
  } catch (error: any) {
    console.error('更新飯盒錯誤:', error);
    res.status(500).json({ error: '更新飯盒失敗' });
  }
});

// 刪除飯盒（僅限捐贈者本人）
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const foodBox = await db('food_boxes').where({ id, donor_id: req.userId }).select('id').first();
    if (!foodBox) {
      return res.status(404).json({ error: '飯盒不存在或無權限' });
    }

    await db('food_boxes').where({ id }).update({ status: 'cancelled' });

    res.json({ message: '飯盒已取消' });
  } catch (error: any) {
    console.error('刪除飯盒錯誤:', error);
    res.status(500).json({ error: '刪除飯盒失敗' });
  }
});

// 上傳圖片
router.post('/upload-image', authenticate, upload.single('image'), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '請提供圖片文件' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  } catch (error: any) {
    console.error('上傳圖片錯誤:', error);
    res.status(500).json({ error: error.message || '上傳圖片失敗' });
  }
});

export default router;
