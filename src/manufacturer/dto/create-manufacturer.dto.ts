import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateManufacturerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Type(() => String)
  readonly mName!: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  @Type(() => String)
  readonly mDesc!: string;
}
