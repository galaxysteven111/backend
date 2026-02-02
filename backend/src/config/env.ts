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

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`\n❌ 缺少必需的環境變量: ${name}`);
    console.error(`   請在 .env 文件或環境中設置 ${name}\n`);
    process.exit(1);
  }
  return value;
}

/** Validate all required env vars at startup and return typed config */
export function validateEnv(): EnvConfig {
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
    console.error('\n===================================');
    console.error('❌ 環境變量驗證失敗');
    console.error('===================================');
    console.error('\n缺少以下必需的環境變量:\n');
    errors.forEach((e) => console.error(`  • ${e}`));
    console.error('\n請參考 ENV_VARIABLES.md 了解所有環境變量的說明。\n');
    process.exit(1);
  }

  return {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT || process.env.BACKEND_PORT || '3001', 10),
    JWT_SECRET: requireEnv('JWT_SECRET'),
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
