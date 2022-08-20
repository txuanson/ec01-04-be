import { User } from '@/auth/decorator/get-user.decorator';
import { JwtPayload } from '@/auth/types/jwt-payload.type';
import { Controller, Get, Headers, Body, Patch, Param, ForbiddenException } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CryptService } from 'src/crypt/crypt.service';
import { CartService } from './cart.service';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly cryptService: CryptService
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

  @Patch(':id/claim')
  @ApiBearerAuth()
  async claimShoppingSession(@User() user: JwtPayload, @Param('id') id: string) {

  }

  @Get(':id')
  @ApiBearerAuth()
  async findOne(@User() user: JwtPayload, @Param('id') id: string, @Headers('Session-Key') headers: string) {
    const foundSession = await this.cartService.findOne(+id);
    if (this.cryptService.verify({ mId: foundSession.mId, mUserId: foundSession.mUserId }, headers) === false
      || (user && foundSession.mUserId !== user.id)) {
      throw new ForbiddenException('You are not allowed to access this resource');
    }
    return foundSession;
  }

  @Patch(':id')
  @ApiBearerAuth()
  async update(@User() user: JwtPayload, @Param('id') id: string, @Body() updateCartDto: UpdateCartDto, @Headers('Session-Key') headers: string) {
    const foundSession = await this.cartService.findOne(+id);
    if (this.cryptService.verify({ mId: foundSession.mId, mUserId: foundSession.mUserId }, headers) === false
      || (user && foundSession.mUserId !== user.id)) {
      throw new ForbiddenException('You are not allowed to access this resource');
    }
    await this.cartService.update(+id, updateCartDto);
    return {
      code: `UPDATE_SHOPPING_SESSION:${updateCartDto.operation}_ITEM`
    }
  }
}