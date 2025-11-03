import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DrizzleService } from 'src/db/drizzle.service';
import { users } from '../db/schema';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
