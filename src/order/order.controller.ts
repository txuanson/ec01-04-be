import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ForbiddenException } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '@/auth/decorator/get-user.decorator';
import { JwtPayload } from '@/auth/types/jwt-payload.type';
import { CryptService } from 'src/crypt/crypt.service';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly cryptService: CryptService,
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  async findOne(@User() user: JwtPayload, @Param('id') id: string, @Query('ssid') ssid: string) {
    const order = await this.orderService.findOne(+id);

    const verify = this.cryptService.verify({ orderId: order.mId }, ssid);

    if (
      (!user && verify === false)
      ||
      (user && ((order.mUserId !== null && order.mUserId !== user.id) || (order.mUserId === null && verify === false)))
    ) {
      throw new ForbiddenException('You are not allowed to access this resource');
    }
    return order;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateOrderStatus(+id, updateOrderDto.mStatus);
  }
}
