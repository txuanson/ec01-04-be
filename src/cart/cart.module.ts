import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CryptModule } from 'src/crypt/crypt.module';
import { OrderModule } from 'src/order/order.module';
import { ProductModule } from 'src/product/product.module';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [CryptModule, OrderModule, ProductModule, PaymentModule],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule { }
