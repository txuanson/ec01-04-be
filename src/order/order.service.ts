import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PaymentStatus } from 'src/payment/types/payment.type';
import { OrderStatus } from './constant/order-status.enum';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        mUserId: createOrderDto.mUserId,
        mStatus: OrderStatus.AWAITING_PAYMENT,
        mAddress: createOrderDto.mAddress,
        mPhone: createOrderDto.mPhone,
        mUserName: createOrderDto.mUserName,
        orderItem: {
          createMany: {
            data: createOrderDto.items
          }
        },
        orderPayment: {
          create: {
            mAmount: createOrderDto.payment.mAmount,
            mProvider: createOrderDto.payment.mProvider,
            mStatus: PaymentStatus.PENDING,
          }
        }
      }
    });
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
