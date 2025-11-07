import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

@Injectable()
export class DrizzleService {
  public db;

  constructor(private readonly config: ConfigService) {
  
    const connectionString = this.config.get<string>('DATABASE_URL');
    if (!connectionString) throw new Error('DATABASE_URL is not defined');

    const pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false }, // NeonDB は SSL 必須
    });

    this.db = drizzle(pool, { schema });
  }
}
