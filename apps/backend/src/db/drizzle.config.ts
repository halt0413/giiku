import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './schema.ts',         // apps/backend/src/db/schema.ts
  out: './migrations',           // migration 出力先
  dialect: 'postgresql',
  connectionString: process.env.DATABASE_URL,
});
