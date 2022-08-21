import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: readFileSync(configService.get('CRYPT_PUBLIC_KEY'), 'utf8'),
      secretOrKey: configService.get('HEROKU_PUBLIC_KEY'),
      algorithms: ['RS256'],
      signOptions: { expiresIn: configService.get('JWT_EXPIRE') }
    });
  }

  async validate(payload: Record<string, any>) {
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}