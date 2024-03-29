import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { OriginModule } from './origin/origin.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { CryptModule } from './crypt/crypt.module';
import { PaymentModule } from './payment/payment.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    CategoryModule,
    ManufacturerModule,
    OriginModule,
    ProductModule,
    CartModule,
    CryptModule,
    OrderModule,
  ]
})
export class AppModule { }
