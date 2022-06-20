import { AuthService } from '@/auth/auth.service';
import { AuthLoginDto, AuthRegisterDto } from '@/auth/dto';
import { AuthForgotPasswordRequestDto } from '@/auth/dto/auth.forgot.request.dto';
import { AuthResetPasswordDto, AuthResetPasswordVerifyDto } from '@/auth/dto/auth.reset.password.dto';
import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Token } from '@/auth/types/token.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/login')
  @ApiOperation({ summary: 'Client login' })
  @ApiResponse({ status: 200, description: 'Login success, return access token', type: Token })
  @ApiResponse({ status: 401, description: 'Unauthorized, user given wrong credentials', type: BadRequestException })
  @HttpCode(200)
  async login(@Body() dto: AuthLoginDto) {
    return this.authService.login(dto)
  }

  @Post('/register')
  @ApiOperation({ summary: 'Client register, if success BE send a confirmation link to provided email' })
  @ApiResponse({ status: 201, description: 'Register success, return nothing except status code' })
  async register(@Body() dto: AuthRegisterDto) {
    return this.authService.register(dto)
  }

  @Post('/forgot')
  @ApiOperation({ summary: 'Forgot password request, BE send email with reset password link' })
  @ApiResponse({ status: 201, description: 'Forgot password requested successfully! Return nothing' })
  async forgotPassword(@Body() dto: AuthForgotPasswordRequestDto) {
    return this.authService.forgetPassword(dto);
  }

  @Post('/verify-forgot-token')
  @ApiOperation({ summary: 'Verify provided token of a user' })
  @ApiResponse({ status: 200, description: 'The token is valid/invalid = true/false', type: Boolean })
  @HttpCode(200)
  async verifyForgotToken(@Body() dto: AuthResetPasswordVerifyDto) {
    return this.authService.verifyForgetPasswordToken(dto);
  }

  @Post('/reset-password')
  @ApiOperation({ summary: 'Reset password by the link in email' })
  @ApiResponse({ status: 204, description: 'New password updated' })
  @HttpCode(204)
  async resetPassword(@Body() dto: AuthResetPasswordDto) {
    return this.authService.resetPasswordByToken(dto);
  }
}
