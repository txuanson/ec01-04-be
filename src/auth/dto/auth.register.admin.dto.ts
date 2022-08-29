import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { AuthRegisterDto } from "./auth.register.dto";

export class AuthRegisterAdminDto extends AuthRegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Type(() => String)
  readonly mName: string;
}