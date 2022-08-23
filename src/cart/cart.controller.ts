import { User } from '@/auth/decorator/get-user.decorator';
import { Roles } from '@/auth/decorator/role.decorator';
import { RolesGuard, UserRole } from '@/auth/guards/role.guard';
import { JwtPayload } from '@/auth/types/jwt-payload.type';
import { Controller, Get, Headers, Body, Patch, Param, ForbiddenException, UseGuards, Post, BadRequestException, Query } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CryptService } from 'src/crypt/crypt.service';
import { OrderService } from 'src/order/order.service';
import { PaymentService } from 'src/payment/payment.service';
import { PaymentStatus } from 'src/payment/types/payment.type';
import { ProductVariantService } from 'src/product/product-variant.service';
import { CartService } from './cart.service';
import { CheckoutCartDto } from './dto/check-out.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly orderService: OrderService,
    private readonly cryptService: CryptService,
    private readonly paymentService: PaymentService,
    private readonly productVariantService: ProductVariantService,
  ) { }

  @Get()
  @ApiBearerAuth()
  async create(@User() user: JwtPayload): Promise<{ code: string, data: any, token: string }> {
    if (user) {
      const userSession = await this.cartService.findSessionByUserId(user.id);
      if (!userSession) {
        const newUserSession = await this.cartService.create(user);
        return {
          code: 'CREATE_SHOPPING_SESSION:USER_SESSION_CREATED',
          data: newUserSession,
          token: this.cryptService.sign({ mId: newUserSession.mId, mUserId: newUserSession.mUserId })
        }
      }
      return {
        code: 'CREATE_SHOPPING_SESSION:SESSION_EXISTS',
        data: userSession,
        token: this.cryptService.sign({ mId: userSession.mId, mUserId: userSession.mUserId })
      }
    }

    const newGuestSession = await this.cartService.create(undefined);

    return {
      code: 'CREATE_SHOPPING_SESSION:GUEST_SESSION_CREATED',
      data: newGuestSession,
      token: this.cryptService.sign({ mId: newGuestSession.mId, mUserId: newGuestSession.mUserId })
    }
  }

  @Post(':id/checkout')
  @ApiBearerAuth()
  async checkOut(@User() user: JwtPayload, @Param('id') id: string, @Headers('Session-Key') headers: string, @Body() checkOutCartDto: CheckoutCartDto) {
    const foundSession = await this.cartService.findOne(+id);
    if (
      (!user && foundSession.mUserId !== null && this.cryptService.verify({ mId: foundSession.mId, mUserId: foundSession.mUserId }, headers) === false)
      || (user && foundSession.mUserId !== user.id)
    ) {
      throw new ForbiddenException('You are not allowed to access this resource');
    }

    if (!foundSession.cartItem.length) {
      throw new BadRequestException('Cart is empty');
    }

    const productItems = await this.productVariantService.findManyBySkus(foundSession.cartItem.map(item => item.mSku));

    let totalPrice = 0;
    const orderItems = foundSession.cartItem.map(item => {
      const productItem = productItems.find(product => product.mSku === item.mSku);
      if (!productItem) {
        throw new BadRequestException(`There is some product which is not available at the moment.`);
      }
      totalPrice += productItem.mPrice * item.mQuantity;
      return {
        mProductId: item.mProductId,
        mSku: item.mSku,
        mQuantity: item.mQuantity,
        mPrice: productItem.mPrice,
      }
    })


    const order = await this.orderService.create({
      mUserId: foundSession.mUserId,
      mAddress: checkOutCartDto.mAddress,
      mPhone: checkOutCartDto.mPhone,
      mUserName: checkOutCartDto.mUserName,
      items: orderItems,
      payment: {
        mProvider: checkOutCartDto.mProvider,
        mAmount: totalPrice,
      }
    });

    const paymentInstance = this.paymentService.getInstance(checkOutCartDto.mProvider);

    const paymentInfo = await paymentInstance.createPaymentOrder(order.mId, {
      mAmount: totalPrice,
      mProvider: checkOutCartDto.mProvider,
      mStatus: PaymentStatus.PENDING,
      items: orderItems,
    }, headers);

    await this.cartService.remove(+id);

    return {
      code: 'CHECK_OUT:SHOPPING_SESSION_CHECKED_OUT',
      data: {
        orderUrl: paymentInfo
      }
    }
  }

  @Patch(':id/migrate')
  @Roles(UserRole.USER)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  async migrateShoppingSession(@User() user: JwtPayload, @Param('id') id: string, @Headers('Session-Key') headers: string) {
    let userSession = await this.cartService.findSessionByUserId(user.id);
    if (!userSession) {
      userSession = await this.cartService.create(user);
    }

    const foundSession = await this.cartService.findOne(+id);
    if (this.cryptService.verify({ mId: foundSession.mId, mUserId: foundSession.mUserId }, headers) === false
      || foundSession.mUserId != null) {
      throw new ForbiddenException('You are not allowed to access this resource');
    }

    await this.cartService.migrateSession(foundSession.mId, userSession.mId);
    return {
      code: 'MIGRATE_SHOPPING_SESSION:SESSION_MIGRATED',
      data: userSession,
      token: this.cryptService.sign({ mId: userSession.mId, mUserId: userSession.mUserId })
    }
  }

  @Get(':id')
  @ApiBearerAuth()
  async findOne(@User() user: JwtPayload, @Param('id') id: string, @Query('ssid') ssid: string) {
    const foundSession = await this.cartService.findOne(+id, true);
    if (
      (!user && foundSession.mUserId !== null && this.cryptService.verify({ mId: foundSession.mId, mUserId: foundSession.mUserId }, ssid) === false)
      || (user && foundSession.mUserId !== user.id)
    ) {
      throw new ForbiddenException('You are not allowed to access this resource');
    }
    return foundSession;
  }

  @Patch(':id')
  @ApiBearerAuth()
  async update(@User() user: JwtPayload, @Param('id') id: string, @Body() updateCartDto: UpdateCartDto, @Headers('Session-Key') headers: string) {
    const foundSession = await this.cartService.findOne(+id);
    if (
      (!user && foundSession.mUserId !== null && this.cryptService.verify({ mId: foundSession.mId, mUserId: foundSession.mUserId }, headers) === false)
      || (user && foundSession.mUserId !== user.id)
    ) {
      throw new ForbiddenException('You are not allowed to access this resource');
    }
    await this.cartService.update(+id, updateCartDto);
    return {
      code: `UPDATE_SHOPPING_SESSION:${updateCartDto.operation}_ITEM`
    }
  }
}