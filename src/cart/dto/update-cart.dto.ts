import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { CreateCartDto } from './create-cart.dto';

export enum UpdateCartOperation {
  ADD = 'ADD',
  REMOVE = 'REMOVE'
}

export class UpdateCartDto {
  @ApiProperty()
  @IsEnum(UpdateCartOperation)
  operation: UpdateCartOperation;

  @ApiProperty()
  @IsInt()
  mProductId: number;

  @ApiProperty()
  @IsString()
  mSku: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  mQuantity: number = 1;
}
