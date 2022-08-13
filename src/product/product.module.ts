import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductVariantService } from './product-variant.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductVariantService]
})
export class ProductModule { }