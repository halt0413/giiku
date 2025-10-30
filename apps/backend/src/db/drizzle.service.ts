import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

@Injectable()
export class DrizzleService {
    public db;

    constructor(private readonly config: ConfigService) {
        const pool = new Pool({
            connectionString: this.config.get<string>('DATABASE'),
            ssl: { rejectUnauthorized: false },
        });

        this.db = drizzle(pool, { schema })
    }
}