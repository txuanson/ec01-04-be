import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AuthRegisterDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  @Type(() => String)
  readonly mEmail: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Type(() => String)
  //@IsPasswordStrong()
  mPassword: string;
}