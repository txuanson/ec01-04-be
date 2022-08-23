import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import crypto from 'crypto';
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { IPaymentService } from "./types/payment.type";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class ZaloPayService implements IPaymentService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) { }

  async createPaymentOrder(orderId: number, createPaymentDto: CreatePaymentDto): Promise<string> {
    const embedData = JSON.stringify({
      redirecturl: this.configService.getOrThrow("ZALO_PAY_REDIRECT_URL") + '/order/' + orderId,
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
      callback_url: this.configService.getOrThrow('ZALO_PAY_HOOK_URI'),
    };

    payload['mac'] = this.createSignature(payload);

    const data = await this.httpService.axiosRef.post(this.configService.getOrThrow("ZALO_PAY_URL") + '/create', {
      ...payload
    })

    return data.data.order_url;
  }
  updatePaymentOrder(orderId: number, updatePaymentDto: UpdatePaymentDto): Promise<void> {
    throw new Error("Method not implemented.");
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