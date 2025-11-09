import { join } from 'path';

export default {
  schema: [join(__dirname, 'schema.ts')],  // schema.ts の絶対パス
  out: join(__dirname, 'drizzle'),         // 出力先
  dialect: 'postgresql',                   // ← これを追加
  driver: 'pg',                            // v0.31でも driver は残してOK
  dbCredentials: process.env.DATABASE_URL, // 環境変数から取得
};
