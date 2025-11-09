import { join } from 'path';

export default {
  schema: [join(__dirname, 'schema.ts')],   // schema.ts の絶対パス
  out: join(__dirname, 'drizzle'),          // 出力先
  dialect: 'postgresql',                     // ← 必須
  // driver は削除！v0.31 以降は PostgreSQL で driver: 'pg' を書くとエラー
  dbCredentials: process.env.DATABASE_URL,  // 環境変数から取得
};
