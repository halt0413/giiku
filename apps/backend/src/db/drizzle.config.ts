// CommonJS 用
import { join } from 'path';

// __dirname は CommonJS で自動的に使える
export default {
  schema: [join(__dirname, 'schema.ts')],
  out: join(__dirname, 'drizzle'),
  driver: 'pg',
  dbCredentials: process.env.DATABASE_URL,
};
