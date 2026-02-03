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

/**
 * Resolve DATABASE_URL.
 * Railway may provide individual PGUSER, POSTGRES_PASSWORD, etc. instead of
 * a fully resolved DATABASE_URL. If DATABASE_URL is missing or still contains
 * unresolved ${{ }} templates, try to build it from the individual vars.
 */
function resolveDatabaseUrl(): string | undefined {
  const raw = process.env.DATABASE_URL;

  // If set and looks like a real URL (not an unresolved template), use it
  if (raw && raw.startsWith('postgresql://') && !raw.includes('${{')) {
    return raw;
  }

  // Try Railway's individual Postgres variables
  const user = process.env.PGUSER || process.env.DB_USER;
  const password = process.env.PGPASSWORD || process.env.POSTGRES_PASSWORD || process.env.DB_PASSWORD;
  const host = process.env.PGHOST || process.env.RAILWAY_PRIVATE_DOMAIN || process.env.DB_HOST;
  const port = process.env.PGPORT || process.env.DB_PORT || '5432';
  const database = process.env.PGDATABASE || process.env.DB_NAME;

  if (user && password && host && database) {
    const constructed = `postgresql://${user}:${password}@${host}:${port}/${database}`;
    console.log('  ℹ️  DATABASE_URL 從 PG* 變量構建');
    // Also set it so knex/database.ts can pick it up
    process.env.DATABASE_URL = constructed;
    return constructed;
  }

  return undefined;
}

/** Validate all required env vars at startup and return typed config */
export function validateEnv(): EnvConfig {
  console.log('===================================');
  console.log('🔍 環境變量檢查');
  console.log('===================================');
  console.log(`  NODE_ENV:     ${process.env.NODE_ENV || '(未設置, 默認 development)'}`);
  console.log(`  PORT:         ${process.env.PORT || process.env.BACKEND_PORT || '(未設置, 默認 3001)'}`);
  console.log(`  JWT_SECRET:   ${process.env.JWT_SECRET ? '✅ 已設置' : '❌ 未設置'}`);

  // Resolve DATABASE_URL (may construct from individual PG vars)
  const databaseUrl = resolveDatabaseUrl();

  const rawDbUrl = process.env.DATABASE_URL;
  if (rawDbUrl && rawDbUrl.includes('${{')) {
    console.log(`  DATABASE_URL: ⚠️  包含未解析的模板變量`);
    console.log(`    提示: Railway 的 $\{{...}} 引用未解析。請確認 PostgreSQL 插件已正確連接。`);
    console.log(`    原始值: ${rawDbUrl.substring(0, 60)}...`);
  } else {
    console.log(`  DATABASE_URL: ${databaseUrl ? '✅ 已設置' : '❌ 未設置'}`);
  }

  // Also log Railway PG vars for debugging
  const hasPgVars = !!(process.env.PGUSER || process.env.PGHOST || process.env.PGDATABASE);
  if (hasPgVars) {
    console.log(`  PGUSER:       ${process.env.PGUSER ? '✅ 已設置' : '❌ 未設置'}`);
    console.log(`  PGHOST:       ${process.env.PGHOST || process.env.RAILWAY_PRIVATE_DOMAIN || '❌ 未設置'}`);
    console.log(`  PGDATABASE:   ${process.env.PGDATABASE ? '✅ 已設置' : '❌ 未設置'}`);
  }

  console.log(`  FRONTEND_URL: ${process.env.FRONTEND_URL || '(未設置, 默認 http://localhost:3000)'}`);
  console.log('===================================');

  const errors: string[] = [];

  // JWT_SECRET is always required
  if (!process.env.JWT_SECRET) {
    errors.push('JWT_SECRET - JWT 認證密鑰（必須設置且不能為空）');
  }

  // Database: need a resolved DATABASE_URL or individual connection vars
  const hasDbConnection = !!databaseUrl || !!(process.env.DB_HOST || process.env.DB_USER);
  if (!hasDbConnection && process.env.NODE_ENV === 'production') {
    errors.push('DATABASE_URL - 數據庫連接字符串（生產環境必需）。可設置 DATABASE_URL 或 PGUSER+PGPASSWORD+PGHOST+PGDATABASE');
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
    DATABASE_URL: databaseUrl,
    DB_HOST: process.env.DB_HOST || process.env.PGHOST || 'localhost',
    DB_PORT: parseInt(process.env.DB_PORT || process.env.PGPORT || '5432', 10),
    DB_USER: process.env.DB_USER || process.env.PGUSER || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || process.env.PGPASSWORD || '',
    DB_NAME: process.env.DB_NAME || process.env.PGDATABASE || 'foodbox_db',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  };
}

export const env = validateEnv();
