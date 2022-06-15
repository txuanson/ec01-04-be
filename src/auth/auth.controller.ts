import { AuthService } from '@/auth/auth.service';
import { AuthLoginDto, AuthRegisterDto } from '@/auth/dto';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() dto: AuthLoginDto) {
    return this.authService.login(dto)
  }

  @Post('/register')
  async register(@Body() dto: AuthRegisterDto) {
    return this.authService.register(dto)
  }

  @Post('/logout')
  logout() { }

  @Post('/refresh')
  refreshToken() {

  }
}
