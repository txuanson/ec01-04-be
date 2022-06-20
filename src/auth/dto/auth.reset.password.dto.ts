import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AuthResetPasswordVerifyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly mToken: string

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  readonly mUserId: number
}

export class AuthResetPasswordDto extends AuthResetPasswordVerifyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Type(() => String)
  //@IsPasswordStrong()
  mPassword: string;
}