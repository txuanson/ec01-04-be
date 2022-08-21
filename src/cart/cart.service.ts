import { JwtPayload } from '@/auth/types/jwt-payload.type';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto, UpdateCartOperation } from './dto/update-cart.dto';

@Injectable()
export class CartService {

  constructor(private prisma: PrismaService) { }

  async create(user: JwtPayload) {
    return this.prisma.shoppingSession.create({
      data: {
        mUserId: user?.id
      },
      include: {
        cartItem: true
      }
    });
  }

  async migrateSession(fromSessionId: number, toSessionId: number) {
    return this.prisma.$transaction(async () => {
      const session = await this.prisma.cartItem.findMany(
        {
          where: {
            mSessionId: fromSessionId
          }
        }
      );

      await Promise.all(session.map(async (item) =>
        this.prisma.cartItem.upsert({
          create: {
            mSessionId: toSessionId,
            mProductId: item.mProductId,
            mSku: item.mSku,
            mQuantity: item.mQuantity
          },
          update: {
            mQuantity: {
              increment: item.mQuantity
            }
          },
          where: {
            mSessionId_mProductId_mSku: {
              mSessionId: toSessionId,
              mProductId: item.mProductId,
              mSku: item.mSku
            }
          }
        })
      ));

      await this.prisma.shoppingSession.delete({
        where: {
          mId: fromSessionId
        }
      });

      return await this.prisma.shoppingSession.findFirstOrThrow({
        where: {
          mId: toSessionId
        },
        include: {
          cartItem: true
        }
      });
    })
  }

  async findSessionByUserId(userId: number) {
    return this.prisma.shoppingSession.findFirst({
      where: {
        mUserId: userId
      },
      include: {
        cartItem: true
      }
    })
  }

  async findOne(id: number) {
    return this.prisma.shoppingSession.findFirstOrThrow({
      where: {
        mId: id
      },
      include: {
        cartItem: true
      }
    })
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    if (updateCartDto.operation === UpdateCartOperation.ADD) {
      return this.prisma.cartItem.upsert({
        create: {
          mSessionId: id,
          mProductId: updateCartDto.mProductId,
          mSku: updateCartDto.mSku,
          mQuantity: updateCartDto.mQuantity
        },
        update: {
          mQuantity: updateCartDto.mQuantity
        },
        where: {
          mSessionId_mProductId_mSku: {
            mSessionId: id,
            mProductId: updateCartDto.mProductId,
            mSku: updateCartDto.mSku
          }
        }
      })
    } else if (updateCartDto.operation === UpdateCartOperation.REMOVE) {
      return this.prisma.cartItem.delete({
        where: {
          mSessionId_mProductId_mSku: {
            mSessionId: id,
            mProductId: updateCartDto.mProductId,
            mSku: updateCartDto.mSku
          }
        }
      });
    }
  }

  async remove(id: number) {
    return this.prisma.shoppingSession.delete({
      where: {
        mId: id
      }
    });
  }
}
