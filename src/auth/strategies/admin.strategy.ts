import { PassportStrategy } from "@nestjs/passport"
import { AuthService } from "../auth.service"
import { Strategy } from "passport-local"
import { Injectable } from "@nestjs/common";

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, "admin") {
  constructor(
    private readonly authService: AuthService
  ) {
    super({ usernameField: 'mEmail', passwordField: 'mPassword' })
  }

  async validate(email: string, password: string) {
    const user = await this.authService.authenticateAdmin(email, password);
    return user;
  }
}