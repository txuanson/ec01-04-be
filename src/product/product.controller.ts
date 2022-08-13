import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ApiBadRequestResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @ApiOperation({ summary: 'Create new product' })
  @ApiResponse({ status: 201, description: 'New product created', type: Product })
  @ApiBadRequestResponse({ description: 'Bad request' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
  
  @Post('/search')
  @ApiOperation({ summary: 'Search for product' })
  @ApiResponse({ status: 200, description: 'List of products found', type: Array<Product> })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @HttpCode(200)
  find(@Body() findProductDto: FindProductDto) {
    return this.productService.find(findProductDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product info' })
  @ApiResponse({ status: 200, description: 'Product info', type: Product })
  @ApiBadRequestResponse({ description: 'Bad request' })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({ status: 200, description: 'Product updated', type: Product })
  @ApiBadRequestResponse({ description: 'Bad request' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({ status: 200, description: 'Product deleted', type: Product })
  @ApiBadRequestResponse({ description: 'Bad request' })
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
