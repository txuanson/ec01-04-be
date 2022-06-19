import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthLoginDto {
  @IsEmail()
  @IsNotEmpty()
  @Type(() => String)
  readonly mEmail: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly mPassword: string;
}