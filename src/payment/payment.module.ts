import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ZaloPayService } from './zalopay.service';

@Module({
  imports: [ConfigModule, HttpModule],
  exports: [PaymentService],
  providers: [ZaloPayService, PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule { }
