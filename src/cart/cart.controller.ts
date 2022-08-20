import { User } from '@/auth/decorator/get-user.decorator';
import { JwtPayload } from '@/auth/types/jwt-payload.type';
import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Get()
  @ApiBearerAuth()
  async create(@User() user: JwtPayload) {
    if (user) {
      console.log(user)
      const ownSession = await this.cartService.findSessionByUserId(user.id);
      if (!ownSession) {
        return {
          code: 'CREATE_SHOPPING_SESSION:USER_SESSION_CREATED',
          data: await this.cartService.create(user)
        }
      }
      return {
        code: 'CREATE_SHOPPING_SESSION:SESSION_EXISTS',
        message: ownSession
      }
    }
    return {
      code: 'CREATE_SHOPPING_SESSION:GUEST_SESSION_CREATED',
      data: await this.cartService.create(undefined)
    }
  }

  @Patch(':id/claim')
  @ApiBearerAuth()
  async claimShoppingSession(@User() user: JwtPayload, @Param('id') id: string) {

  }

  @Get(':id')
  @ApiBearerAuth()
  async findOne(@User() user: JwtPayload, @Param('id') id: string) {
    return await this.cartService.findOne(user, +id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  async update(@User() user: JwtPayload, @Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    await this.cartService.findOne(user, +id);

    await this.cartService.update(+id, updateCartDto);
    return {
      code: `UPDATE_SHOPPING_SESSION:${updateCartDto.operation}_ITEM`
    }
  }

  

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cartService.remove(+id);
  // }
}
