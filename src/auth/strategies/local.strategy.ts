import { PassportStrategy } from "@nestjs/passport"
import { AuthService } from "../auth.service"
import { Strategy } from "passport-local"
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
  constructor(
    private readonly authService: AuthService
  ) {
    super({ usernameField: 'mEmail', passwordField: 'mPassword' })
  }

  async validate(email: string, password: string) {
    const user = await this.authService.authenticate(email, password);
    console.log('passport', user)
    return user;
  }
}