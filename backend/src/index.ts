import express from 'express';
import compression from 'compression';
import cors from 'cors';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { securityHeaders } from './middleware/security';
import { AppError, formatErrorResponse } from './utils/errors';
import logger from './utils/logger';
import db from './config/database';

const app = express();
const httpServer = createServer(app);

// CORS origin: 支持多個域名（逗號分隔）
const allowedOrigins = env.FRONTEND_URL.split(',').map((s) => s.trim()).filter(Boolean);

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins.length === 1 ? allowedOrigins[0] : allowedOrigins,
  credentials: true,
};

const io = new Server(httpServer, { cors: corsOptions });

// 中間件
app.use(securityHeaders);
app.use(compression());
app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// 速率限制 - 通用
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分鐘
  max: 200,
  message: { error: '請求過於頻繁，請稍後再試' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', generalLimiter);

// 速率限制 - 認證端點（更嚴格）
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分鐘
  max: 20,
  message: { error: '登入/註冊請求過於頻繁，請稍後再試' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// 靜態文件服務 - 上傳的圖片（帶緩存）
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads'), {
  maxAge: '7d',
  immutable: true,
}));

// 根路由
app.get('/', (_req, res) => {
  res.json({
    message: '歡迎使用捐飯盒平台API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api',
    },
  });
});

// 健康檢查（含數據庫連接檢測）
app.get('/health', async (_req, res) => {
  let dbStatus: { connected: boolean; latency?: string } = { connected: false };
  try {
    const start = Date.now();
    await db.raw('SELECT 1');
    dbStatus = { connected: true, latency: `${Date.now() - start}ms` };
  } catch {
    dbStatus = { connected: false };
  }

  const status = dbStatus.connected ? 'ok' : 'degraded';
  res.status(dbStatus.connected ? 200 : 503).json({
    status,
    timestamp: new Date().toISOString(),
    database: dbStatus,
    version: '1.0.0',
    environment: env.NODE_ENV,
  });
});

// API路由
import authRoutes from './routes/auth';
import foodBoxRoutes from './routes/foodBoxes';
import applicationRoutes from './routes/applications';
import notificationRoutes from './routes/notifications';

app.get('/api', (_req, res) => {
  res.json({
    message: '歡迎使用捐飯盒平台API',
    version: '1.0.0'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/food-boxes', foodBoxRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/notifications', notificationRoutes);

// Socket.io連接
io.on('connection', (socket) => {
  console.log('用戶連接:', socket.id);

  socket.on('disconnect', () => {
    console.log('用戶斷開連接:', socket.id);
  });
});

// 404處理 - 必須在路由之後、錯誤處理之前
app.use((_req: express.Request, res: express.Response) => {
  res.status(404).json({ error: '路由不存在' });
});

// 錯誤處理中間件
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const isProduction = env.NODE_ENV === 'production';
  const statusCode = err instanceof AppError ? err.statusCode : 500;

  if (statusCode >= 500) {
    logger.error('Unhandled error', {
      message: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
  }

  res.status(statusCode).json(formatErrorResponse(err, isProduction));
});

httpServer.listen(env.PORT, '0.0.0.0', () => {
  console.log('===================================');
  console.log(`🚀 服務器已啟動`);
  console.log(`   地址: http://0.0.0.0:${env.PORT}`);
  console.log(`   環境: ${env.NODE_ENV}`);
  console.log(`   CORS: ${allowedOrigins.join(', ')}`);
  console.log('===================================');
});

export { app, io };
