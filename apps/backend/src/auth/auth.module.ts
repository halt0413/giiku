import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DrizzleModule } from 'src/db/drizzle.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    DrizzleModule,
    JwtModule.register({
      secret: process.env.JWT || 'aoi.com',
      signOptions: { expiresIn: '3h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
