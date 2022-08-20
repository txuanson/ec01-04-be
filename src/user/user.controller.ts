import { User } from '@/auth/decorator/get-user.decorator';
import { Roles } from '@/auth/decorator/role.decorator';
import { AuthenticationGuard } from '@/auth/guards/auth.guard';
import { JwtPayload } from '@/auth/types/jwt-payload.type';
import { ClassSerializerInterceptor, Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userSerivce: UserService
  ) { }

  @Get('whoami')
  @ApiBearerAuth()
  @ApiOperation({summary: 'Get current user info'})
  @ApiResponse({status: 200, type: UserEntity, description: 'User info'})
  @ApiUnauthorizedResponse({description: 'Unauthorized! Need login'})
  whoami(@User() user: JwtPayload): Promise<Omit<UserEntity, 'mPassword' | 'mCreatedAt' | 'mModifiedAt'>> {
    return this.userSerivce.findById(user.id)
  }
}
