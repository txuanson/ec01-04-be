import { Injectable } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { IPaymentService, PaymentProvider } from "./types/payment.type";
import { ZaloPayService } from "./zalopay.service";

@Injectable()
export class PaymentService {
  private paymentServiceInstance: IPaymentService

  constructor(
    private moduleRef: ModuleRef
  ) { }

  getInstance(paymentProvider: PaymentProvider) {
    if (!this.paymentServiceInstance) {
      switch (paymentProvider) {
        case PaymentProvider.ZALO_PAY:
          this.paymentServiceInstance = this.moduleRef.get(ZaloPayService);
          break;
        default:
          throw new Error(`Payment provider ${paymentProvider} is not supported`);
      }
    }

    return this.paymentServiceInstance;
  }
}
