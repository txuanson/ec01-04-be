import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@/user/user.module';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { readFileSync } from 'fs';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        // privateKey: readFileSync(configService.get('CRYPT_PRIVATE_KEY'), 'utf8'),
        // publicKey: readFileSync(configService.get('CRYPT_PUBLIC_KEY'), 'utf8'),
        privateKey: configService.get('HEROKU_PRIVATE_KEY'),
        publicKey: configService.get('HEROKU_PUBLIC_KEY'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRE'),
          algorithm: 'RS256'
        }
      }),
      inject: [ConfigService]
    }),
    ConfigModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
