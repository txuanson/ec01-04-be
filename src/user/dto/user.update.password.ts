import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class UserUpdatePasswordDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  readonly mUserId: number;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly mPassword: string;
}