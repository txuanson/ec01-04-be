import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CryptModule } from 'src/crypt/crypt.module';

@Module({
  imports: [CryptModule],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
