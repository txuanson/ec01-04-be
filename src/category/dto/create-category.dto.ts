import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, MaxLength, ValidateIf } from "class-validator";

export class CreateCategoryDto  {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Type(() => String)
  readonly mName!: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  @Type(() => String)
  readonly mDesc!: string
  
  @ApiProperty()
  @IsInt()
  @ValidateIf((object, value) => value !== null)
  readonly mParentCategoryId!: number | null
}
