import { AuthLoginDto, AuthRegisterDto } from '@/auth/dto';
import { AuthForgotPasswordRequestDto } from '@/auth/dto/auth.forgot.request.dto';
import { AuthResetPasswordDto, AuthResetPasswordVerifyDto } from '@/auth/dto/auth.reset.password.dto';
import { Token } from '@/auth/types/token.type';
import { PrismaService } from '@/prisma/prisma.service';
import { UserService } from '@/user/user.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2'
import { randomBytes } from 'crypto'
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async login(dto: AuthLoginDto): Promise<Token> {
    const user = await this.userService.findByEmail(dto.mEmail);

    if (!user || (await this._verifyPassword(user.mPassword, dto.mPassword)) === false) {
      throw new UnauthorizedException(['Email or password were incorrect!']);
    }

    return {
      accessToken: this.jwtService.sign({ sub: user.mId, email: user.mEmail })
    }
  }

  async register(dto: AuthRegisterDto): Promise<void> {
    if (await this.userService.exists(dto.mEmail)) {
      throw new BadRequestException(['This email is already used!']);
    }

    dto.mPassword = await this._hashPassword(dto.mPassword);

    await this.userService.create(dto, dto.mEmail.split('@')[0])
  }

  async forgetPassword(dto: AuthForgotPasswordRequestDto): Promise<void> {
    const requestedUser = await this.userService.findByEmail(dto.mEmail);
    if (!requestedUser) {
      throw new BadRequestException(['Your requested email is not exists in our database!']);
    }

    await this.prisma.forgetPasswordToken.upsert({
      create: {
        mUserId: requestedUser.mId,
        mToken: this._generateRandomToken(),
        mExpire: this._getCurrentDateOffsetByMinute(15)
      },
      where: {
        mUserId: requestedUser.mId
      },
      update: {
        mToken: this._generateRandomToken(),
        mExpire: this._getCurrentDateOffsetByMinute(15)
      }
    })

    // mail...
  }

  async verifyForgetPasswordToken(dto: AuthResetPasswordVerifyDto): Promise<Boolean> {
    const token = this.prisma.forgetPasswordToken.findFirst({
      where: {
        mUserId: dto.mUserId,
        mToken: dto.mToken,
        mExpire: {
          gte: new Date()
        }
      }
    });
    return token ? true : false;
  }

  async resetPasswordByToken(dto: AuthResetPasswordDto): Promise<void> {
    if (!(await this.verifyForgetPasswordToken({ mUserId: dto.mUserId, mToken: dto.mToken }))) {
      throw new BadRequestException(['Provided reset password token is invalid or exprired!']);
    }

    const hashedPassword = await this._hashPassword(dto.mPassword);

    await this.userService.updatePassword({ mUserId: dto.mUserId, mPassword: hashedPassword })

    await this.prisma.forgetPasswordToken.deleteMany({
      where: {
        mUserId: dto.mUserId
      }
    })
  }

  async logout() { }

  async refreshToken() { }

  private async _hashPassword(plainPassword: string): Promise<string> {
    return argon2.hash(plainPassword);
  }

  private async _verifyPassword(hashedPassword: string, plainPassword: string) {
    return argon2.verify(hashedPassword, plainPassword);
  }

  private _generateRandomToken() {
    return randomBytes(48).toString('hex');
  }

  private _getCurrentDateOffsetByMinute(minuteCount: number) {
    return new Date((new Date()).getTime() + minuteCount * 60000)
  }
}