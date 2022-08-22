import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { PaymentProvider } from "src/payment/types/payment.type";

export class CheckoutCartDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PaymentProvider)
  mProvider: PaymentProvider = PaymentProvider.COD;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  mAddress: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  mPhone: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  mUserName: string;
}