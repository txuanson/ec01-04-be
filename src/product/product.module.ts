import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductVariantService } from './product-variant.service';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [CategoryModule],
  exports: [ProductService, ProductVariantService],
  controllers: [ProductController],
  providers: [ProductService, ProductVariantService]
})
export class ProductModule { }
