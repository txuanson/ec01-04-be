import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import crypto from 'crypto';
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { IPaymentService, PaymentStatus } from "./types/payment.type";
import { HttpService } from "@nestjs/axios";
import { OrderService } from "src/order/order.service";
import { OrderStatus } from "src/order/constant/order-status.enum";
import { CryptService } from "src/crypt/crypt.service";

@Injectable()
export class ZaloPayService implements IPaymentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly orderService: OrderService,
    private readonly cryptService: CryptService,
  ) { }

  async createPaymentOrder(orderId: number, createPaymentDto: CreatePaymentDto, ssid: string): Promise<string> {
    console.log(ssid)
    const embedData = JSON.stringify({
      redirecturl: this.configService.getOrThrow("FRONT_END_URI") + '/order/' + orderId + '/thank-you?ssid=' + ssid,
      orderId
    });

    const date = format(new Date(), 'yyMMdd', { locale: vi });
    const currentTimestamp = Date.now();

    const payload = {
      app_id: +this.configService.getOrThrow("ZALO_PAY_APP_ID"),
      app_user: `${orderId}`,
      app_trans_id: `${date}_${orderId}`,
      app_time: currentTimestamp,
      amount: createPaymentDto.mAmount,
      item: JSON.stringify(createPaymentDto.items),
      description: `EC04-01 Zalopay - #${orderId}`,
      embed_data: embedData,
      bank_code: '',
      callback_url: this.configService.getOrThrow('PAYMENT_HOOK_URI') + '/zalo-pay',
    };

    payload['mac'] = this.createSignature(payload);

    const data = await this.httpService.axiosRef.post(this.configService.getOrThrow("ZALO_PAY_URL") + '/create', {
      ...payload
    })

    return data.data.order_url;
  }

  async processCallback(payload: any): Promise<any> {
    if (!this.verifySignature(payload.mac, payload.data)) {
      return {
        return_code: 2,
        return_message: 'Signature invalid!'
      }
    }

    try {
      const data = JSON.parse(payload.data);
      const embed_data = JSON.parse(data.embed_data);
      const orderId = embed_data.orderId;

      await Promise.all([
        this.orderService.updateOrderStatus(orderId, OrderStatus.PROCESSING),
        this.prisma.orderPayment.update({
          where: { mOrderId: orderId },
          data: {
            mStatus: PaymentStatus.SUCCEEDED
          },
        })
      ])

      return {
        return_code: 1,
        return_message: 'Success!'
      }
    } catch (error) {
      console.error(error);
      return {
        return_code: -1,
        return_message: 'Something went wrong!'
      }
    }
  }

  createSignature(data: any): string {
    const { app_id, app_trans_id, app_user, amount, app_time, embed_data, item } = data;
    return crypto.createHmac('sha256', this.configService.getOrThrow("ZALO_PAY_KEY1"))
      .update(`${app_id}|${app_trans_id}|${app_user}|${amount}|${app_time}|${embed_data}|${item}`).digest('hex')
  }

  verifySignature(signature: string, data: string): boolean {
    return crypto.createHmac('sha256', this.configService.getOrThrow("ZALO_PAY_KEY2"))
      .update(data).digest('hex') == signature;
  }


}