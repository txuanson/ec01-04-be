import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { OrderStatus } from "../constant/order-status.enum";

export class UpdateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  mStatus: OrderStatus = OrderStatus.CANCELED;
}
