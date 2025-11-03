import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import type { AuthDto } from '../../../../packages/common/src/dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

  @Post('sign')
  signup(@Body() authDto: AuthDto) {
    return this.authService.signup(authDto);
  }
}
