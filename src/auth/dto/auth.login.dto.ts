import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthLoginDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Type(() => String)
  readonly mEmail: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly mPassword: string;
}