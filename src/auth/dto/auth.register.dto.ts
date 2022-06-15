import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AuthRegisterDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @Type(() => String)
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  @Type(() => String)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Type(() => String)
  //@IsPasswordStrong()
  readonly password: string;
}