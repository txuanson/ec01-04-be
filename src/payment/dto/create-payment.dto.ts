import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PaymentProvider, PaymentStatus } from "../types/payment.type";

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(PaymentProvider)
  mProvider: PaymentProvider;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @IsEnum(PaymentStatus)
  mStatus: PaymentStatus = PaymentStatus.PENDING;

  @IsNotEmpty()
  @IsInt()
  mAmount: number = 0;

  @IsNotEmpty()
  @IsArray()
  items: Array<{
    mProductId: number;
    mSku: string;
    mQuantity: number;
    mPrice: number;
  }> = [];
}