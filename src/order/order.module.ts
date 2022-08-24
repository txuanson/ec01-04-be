import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CryptModule } from 'src/crypt/crypt.module';

@Module({
  exports: [OrderService],
  imports: [CryptModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule { }
