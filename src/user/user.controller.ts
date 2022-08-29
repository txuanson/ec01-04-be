import { User } from '@/auth/decorator/get-user.decorator';
import { Roles } from '@/auth/decorator/role.decorator';
import { AuthenticationGuard } from '@/auth/guards/auth.guard';
import { RolesGuard, UserRole } from '@/auth/guards/role.guard';
import { JwtPayload } from '@/auth/types/jwt-payload.type';
import { Body, ClassSerializerInterceptor, Controller, Delete, ForbiddenException, Get, Param, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { UserEntity } from './entities/user.entity';
import { UserAddressService } from './user-address.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userSerivce: UserService,
    private readonly userAddressService: UserAddressService
  ) { }

  @Get('whoami')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user info' })
  @ApiResponse({ status: 200, type: UserEntity, description: 'User info' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized! Need login' })
  async whoami(@User() user: JwtPayload): Promise<Omit<UserEntity, 'mPassword' | 'mCreatedAt' | 'mModifiedAt'>> {
    return await this.userSerivce.findById(user.id)
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  async findAll(): Promise<UserEntity[]> {
    return await this.userSerivce.findAll();
  }

  @Get('address')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user addresses' })
  async findUserAddress(@User() user: JwtPayload): Promise<any> {
    return await this.userAddressService.findByUserId(user.id)
  }

  @Patch('address/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current user address' })
  async updateUserAddress(@User() user: JwtPayload, @Param('id') id: string, @Body() updateUserAddressDto: UpdateUserAddressDto): Promise<any> {
    const currentAddress = await this.userAddressService.findById(+id);
    if (currentAddress.mUserId !== user.id) {
      throw new ForbiddenException('You can not update other user address')
    }

    return await this.userAddressService.update(+id, updateUserAddressDto)
  }

  @Delete('address/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete current user address' })
  async deleteUserAddress(@User() user: JwtPayload, @Param('id') id: string): Promise<any> {
    const currentAddress = await this.userAddressService.findById(+id);
    if (currentAddress.mUserId !== user.id) {
      throw new ForbiddenException('You can not delete other user address')
    }

    return await this.userAddressService.delete(+id)
  }
}
