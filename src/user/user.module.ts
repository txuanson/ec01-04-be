import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserAddressService } from './user-address.service';

@Module({
  exports: [UserService, UserAddressService],
  providers: [UserService, UserAddressService],
  controllers: [UserController]
})
export class UserModule { }
