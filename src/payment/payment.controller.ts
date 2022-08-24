import { BadRequestException, Body, Controller, Param, Post } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { IPaymentService, PaymentProvider } from "./types/payment.type";

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
  ) { }

  @Post('hook/:type')
  async receivePaymentNotification(@Param('type') paymentProvider: string, @Body() body: any) {
    let paymentInstance: IPaymentService = null;
    switch (paymentProvider) {
      case 'zalo-pay':
        paymentInstance = this.paymentService.getInstance(PaymentProvider.ZALO_PAY);
        break;

      default:
        throw new BadRequestException('Invalid payment provider');
    }

    const data = await paymentInstance.processCallback(body);

  }
}