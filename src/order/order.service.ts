import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CryptService } from 'src/crypt/crypt.service';
import { PaymentStatus } from 'src/payment/types/payment.type';
import { OrderStatus } from './constant/order-status.enum';
import { CreateOrderDto } from './dto/create-order.dto';

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

  async findAll() {
    return `This action returns all order`;
  }

  async findOne(id: number) {
    return await this.prisma.order.findUniqueOrThrow({
      where: { mId: id },
      select: {
        mId: true,
        mUserId: true,
        mStatus: true,
        mAddress: true,
        mPhone: true,
        mUserName: true,
        orderItem: {
          select: {
            mPrice: true,
            mQuantity: true,
            productVariant: {
              select: {
                mVariantType: true,
                mVariantValue: true,
                product: {
                  select: {
                    mName: true,
                    mPhotos: true,
                    mSlug: true
                  }
                }
              },
            }
          }
        }
      }
    });
  }

  async updateOrderStatus(id: number, mStatus: OrderStatus) {
    return this.prisma.order.update({
      where: { mId: id },
      data: { mStatus }
    });
  }
}
