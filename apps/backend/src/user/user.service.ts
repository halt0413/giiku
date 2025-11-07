import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DrizzleService } from '../db/drizzle.service';
import { users } from '../db/schema';
import type { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly drizzle: DrizzleService) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return await this.drizzle.db.select().from(users);
  }

  async findOne(id: string) {
    const user = await this.drizzle.db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async setting(req , name: string) {
    const id = req.user.id;
    await this.drizzle.db.update(users).set(name).where(eq(users.id, id));

    return await this.findOne(id)
  }
}
