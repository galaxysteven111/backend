import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import db from '../config/database';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

const HONG_KONG_DISTRICTS = [
  '中西區', '東區', '南區', '灣仔區',
  '九龍城區', '觀塘區', '深水埗區', '黃大仙區', '油尖旺區',
  '離島區', '葵青區', '北區', '西貢區', '沙田區', '大埔區', '荃灣區', '屯門區', '元朗區'
];

const registerSchema = z.object({
  email: z.string().email('請提供有效的電子郵件地址').max(255),
  password: z.string().min(8, '密碼至少需要8個字符').max(128),
  name: z.string().min(1, '請提供姓名').max(100).trim(),
  phone: z.string().max(20).optional().default(''),
  role: z.enum(['donor', 'recipient', 'both']).default('both'),
  district: z.string().refine(val => !val || HONG_KONG_DISTRICTS.includes(val), '無效的地區').optional().default(''),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
});

const loginSchema = z.object({
  email: z.string().email('請提供有效的電子郵件地址'),
  password: z.string().min(1, '請提供密碼'),
});

// 註冊
router.post('/register', async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message || '輸入驗證失敗';
      return res.status(400).json({ error: firstError });
    }

    const { email, password, name, phone, role, district, latitude, longitude } = parsed.data;

    // 檢查用戶是否已存在
    const existingUser = await db('users').where({ email: email.toLowerCase() }).first();
    if (existingUser) {
      return res.status(400).json({ error: '該電子郵件已被註冊' });
    }

    // 加密密碼
    const passwordHash = await bcrypt.hash(password, 12);

    // 創建用戶
    const [user] = await db('users')
      .insert({
        email: email.toLowerCase(),
        password_hash: passwordHash,
        name,
        phone,
        role,
        district,
        latitude,
        longitude
      })
      .returning(['id', 'email', 'name', 'role', 'district']);

    // 生成JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({
      message: '註冊成功',
      user,
      token
    });
  } catch (error: any) {
    console.error('註冊錯誤:', error);
    res.status(500).json({ error: '註冊失敗' });
  }
});

// 登錄
router.post('/login', async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message || '輸入驗證失敗';
      return res.status(400).json({ error: firstError });
    }

    const { email, password } = parsed.data;

    // 查找用戶
    const user = await db('users').where({ email: email.toLowerCase() }).first();
    if (!user) {
      return res.status(401).json({ error: '無效的電子郵件或密碼' });
    }

    // 驗證密碼
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: '無效的電子郵件或密碼' });
    }

    // 生成JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      message: '登錄成功',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        district: user.district
      },
      token
    });
  } catch (error: any) {
    console.error('登錄錯誤:', error);
    res.status(500).json({ error: '登錄失敗' });
  }
});

// 獲取當前用戶信息
router.get('/me', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = await db('users')
      .where({ id: req.userId })
      .select('id', 'email', 'name', 'phone', 'role', 'district', 'latitude', 'longitude', 'avatar_url', 'is_verified')
      .first();

    if (!user) {
      return res.status(404).json({ error: '用戶不存在' });
    }

    res.json({ user });
  } catch (error: any) {
    console.error('獲取用戶信息錯誤:', error);
    res.status(500).json({ error: '獲取用戶信息失敗' });
  }
});

export default router;
