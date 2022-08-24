import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CryptModule } from 'src/crypt/crypt.module';
import { OrderModule } from 'src/order/order.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ZaloPayService } from './zalopay.service';

@Module({
  imports: [ConfigModule, HttpModule, OrderModule, CryptModule],
  exports: [PaymentService],
  providers: [ZaloPayService, PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule { }
