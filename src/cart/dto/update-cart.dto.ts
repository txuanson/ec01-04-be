import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCartDto } from './create-cart.dto';

export class UpdateCartDto {
  @ApiProperty()
  operation: 'ADD' | 'REMOVE'
}
