import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsInt, IsNumber, IsOptional, IsString, Min } from "class-validator";

interface IPrismaSort {
  [key: string]: 'desc' | 'asc'
}

export class FindProductDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim().toLowerCase().replaceAll(' ', ' | '))
  mName: string = '';

  @ApiProperty({
    type: [Number],
    format: 'form',
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly category?: number[];


  @ApiProperty({
    type: [Number],
    format: 'form',
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly manufacturer?: number[] = [];

  @ApiProperty({
    type: [Number],
    format: 'form',
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly origin?: number[] = [];

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly page: number = 1;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly pageSize: number = 20;

  @ApiProperty({
    type: Array<IPrismaSort>
  })
  @IsOptional()
  readonly sort: Array<IPrismaSort>

  readonly skip: number = (this.page - 1) * this.pageSize;
}