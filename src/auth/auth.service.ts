import { AuthLoginDto, AuthRegisterDto } from '@/auth/dto';
import { Token } from '@/auth/types/token.type';
import { UserService } from '@/user/user.service';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2'
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async login(dto: AuthLoginDto): Promise<Token> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user || (await argon2.verify(user.password, dto.password)) === false) {
      throw new UnauthorizedException(['Email or password were incorrect!'])
    }

    return {
      accessToken: this.jwtService.sign({ sub: user.id, email: user.email })
    }
  }

  async register(dto: AuthRegisterDto): Promise<any> {
    if (await this.userService.existByEmail(dto.email)) {
      throw new ConflictException(['Email already exists!'])
    }

    return this.userService.create(dto)
  }

  async logout() { }

  async refreshToken() { }

}