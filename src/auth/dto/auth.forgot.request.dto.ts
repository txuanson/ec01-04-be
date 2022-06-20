import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthForgotPasswordRequestDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Type(() => String)
  readonly mEmail: string
}