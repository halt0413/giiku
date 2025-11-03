import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DrizzleService } from 'src/db/drizzle.service';
import type { AuthDto } from '../../../../packages/common/src/dto/auth.dto';
import { users } from '../db/schema';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly drizzle: DrizzleService,
    private readonly jwt: JwtService,
  ) {}

  async login(authDto: AuthDto) {
    const users = await this.userService.findOne(authDto.id);
    const user = users[0];

    if (!user || !(await bcrypt.compare(authDto.password, user.password))) {
      console.log('IDまたはパスワードが違います');
      throw new HttpException('IDまたはパスワードが違います', HttpStatus.CONFLICT);
    }

    const payload = { id: user.id, name: user.name };
    const token = await this.jwt.signAsync(payload);

    return { token: token, user_id: payload.id };
  }

  async signup(authDto: AuthDto) {
    const isUser = await this.userService.findOne(authDto.id);

    if (isUser && isUser.length > 0) {
      console.log('そのIDは使用されています');
      throw new HttpException('そのIDは使用されています', HttpStatus.CONFLICT);
    }

    const id = authDto.id;
    const pass = authDto.password;

    if (pass.length < 4) {
      console.log('パスワードは4文字以上にしてください');
      throw new HttpException('パスワードは4文字以上にしてください', HttpStatus.CONFLICT);
    }

    const created_at = new Date().toISOString().split('T')[0];
    const hashPass = await bcrypt.hash(pass, 10);
    const result = await this.drizzle.db
      .insert(users)
      .values({
        id,
        password: hashPass,
        created_at,
      })
      .returning();

    return result;
  }
}
