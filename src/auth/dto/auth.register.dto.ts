import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AuthRegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  @Type(() => String)
  readonly mEmail: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Type(() => String)
  //@IsPasswordStrong()
  mPassword: string;
}