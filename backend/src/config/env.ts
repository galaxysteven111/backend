import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  NODE_ENV: string;
  PORT: number;
  JWT_SECRET: string;
  DATABASE_URL: string | undefined;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  FRONTEND_URL: string;
}

/** Validate all required env vars at startup and return typed config */
export function validateEnv(): EnvConfig {
  console.log('===================================');
  console.log('🔍 環境變量檢查');
  console.log('===================================');
  console.log(`  NODE_ENV:     ${process.env.NODE_ENV || '(未設置, 默認 development)'}`);
  console.log(`  PORT:         ${process.env.PORT || process.env.BACKEND_PORT || '(未設置, 默認 3001)'}`);
  console.log(`  JWT_SECRET:   ${process.env.JWT_SECRET ? '✅ 已設置' : '❌ 未設置'}`);
  console.log(`  DATABASE_URL: ${process.env.DATABASE_URL ? '✅ 已設置' : '❌ 未設置'}`);
  console.log(`  FRONTEND_URL: ${process.env.FRONTEND_URL || '(未設置, 默認 http://localhost:3000)'}`);
  console.log('===================================');

  const errors: string[] = [];

  // JWT_SECRET is always required
  if (!process.env.JWT_SECRET) {
    errors.push('JWT_SECRET - JWT 認證密鑰（必須設置且不能為空）');
  }

  // Database: either DATABASE_URL or individual DB_* vars
  const hasDbUrl = !!process.env.DATABASE_URL;
  const hasDbParts = !!(process.env.DB_HOST || process.env.DB_USER);
  if (!hasDbUrl && !hasDbParts && process.env.NODE_ENV === 'production') {
    errors.push('DATABASE_URL - 數據庫連接字符串（生產環境必需）');
  }

  if (errors.length > 0) {
    console.error('\n❌ 環境變量驗證失敗！缺少:\n');
    errors.forEach((e) => console.error(`  • ${e}`));
    console.error('\n請參考 ENV_VARIABLES.md 了解所有環境變量的說明。\n');
    process.exit(1);
  }

  console.log('✅ 環境變量驗證通過\n');

  return {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT || process.env.BACKEND_PORT || '3001', 10),
    JWT_SECRET: process.env.JWT_SECRET!,
    DATABASE_URL: process.env.DATABASE_URL,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: parseInt(process.env.DB_PORT || '5432', 10),
    DB_USER: process.env.DB_USER || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_NAME || 'foodbox_db',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  };
}

export const env = validateEnv();
