#!/usr/bin/env node

/**
 * 數據庫遷移腳本 - 用於生產環境部署
 * 使用方法: node scripts/migrate.js
 */

const { execSync } = require('child_process');

function run() {
  // 檢查環境
  if (!process.env.DATABASE_URL) {
    console.error('❌ 缺少 DATABASE_URL 環境變量');
    console.error('   生產環境遷移需要設置 DATABASE_URL');
    process.exit(1);
  }

  console.log('🔄 開始數據庫遷移...');
  console.log(`   環境: ${process.env.NODE_ENV || 'development'}`);

  try {
    const output = execSync('npx knex migrate:latest --knexfile knexfile.ts', {
      cwd: __dirname + '/..',
      stdio: 'pipe',
      env: { ...process.env, NODE_ENV: process.env.NODE_ENV || 'production' },
    });
    console.log(output.toString());
    console.log('✅ 數據庫遷移完成');
  } catch (error) {
    console.error('❌ 數據庫遷移失敗:');
    console.error(error.stderr ? error.stderr.toString() : error.message);
    process.exit(1);
  }
}

run();
