import { AuthLoginDto, AuthRegisterDto } from '@/auth/dto';
import { Token } from '@/auth/types/token.type';
import { UserService } from '@/user/user.service';
import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2'
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async login(dto: AuthLoginDto): Promise<Token> {
    const user = await this.userService.findByEmail(dto.mEmail);

    if (!user || (await this.verifyPassword(user.mPassword, dto.mPassword)) === false) {
      throw new UnauthorizedException(['Email or password were incorrect!'])
    }

    return {
      accessToken: this.jwtService.sign({ sub: user.mId, email: user.mEmail })
    }
  }

  async register(dto: AuthRegisterDto): Promise<any> {
    if (this.userService.exists(dto.mEmail)) {
      throw new BadRequestException('This email is already used!');
    }

    dto.mPassword = await this.hashPassword(dto.mPassword);

    await this.userService.create(dto, dto.mEmail.split('@')[0])

    return { message: 'OK' }
  }

  async logout() { }

  async refreshToken() { }

  private async hashPassword(plainPassword: string): Promise<string> {
    return argon2.hash(plainPassword);
  }

  private async verifyPassword(hashedPassword: string, plainPassword: string) {
    return argon2.verify(hashedPassword, plainPassword);
  }
}