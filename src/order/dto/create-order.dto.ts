import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsObject, IsOptional, IsString } from "class-validator";
import { PaymentProvider } from "src/payment/types/payment.type";

export class CreateOrderDto {
  @ApiProperty()
  @IsOptional()
  mUserId: number;

  @ApiProperty()
  @IsString()
  mAddress: string;

  @ApiProperty()
  @IsString()
  mPhone: string;

  @ApiProperty()
  @IsString()
  mUserName: string;

  @ApiProperty()
  @IsArray()
  items: Array<{
    mProductId: number;
    mSku: string;
    mQuantity: number;
    mPrice: number;
  }>;

  @ApiProperty()
  @IsObject()
  payment: {
    mProvider: PaymentProvider;
    mAmount: number;
  };
}
