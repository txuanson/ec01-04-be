import { CreatePaymentDto } from "../dto/create-payment.dto";
import { UpdatePaymentDto } from "../dto/update-payment.dto";

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCEEDED = 'SUCCEEDED',
  CANCELED = 'CANCELED',
  FAILED = 'FAILED',
}

export enum PaymentProvider {
  COD = 'COD',
  ZALO_PAY = 'ZALO_PAY',
  VN_PAY = 'VN_PAY',
  CREDIT_CARD = 'CREDIT_CARD',
  PAYPAL = 'PAYPAL',
}

export interface IPaymentService {
  createPaymentOrder(orderId: number, createPaymentDto: CreatePaymentDto, ssid: string): Promise<string>;
  updatePaymentOrder(orderId: number, updatePaymentDto: UpdatePaymentDto): Promise<void>;

  createSignature(data: any): string;
  verifySignature(signature: string, data: any): boolean;
}