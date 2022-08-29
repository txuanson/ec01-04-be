import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOperation, ApiResponse, IntersectionType } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { ProductVariantService } from './product-variant.service';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { CategoryService } from 'src/category/category.service';
import { Roles } from '@/auth/decorator/role.decorator';
import { RolesGuard, UserRole } from '@/auth/guards/role.guard';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productVariantService: ProductVariantService,
    private readonly categoryService: CategoryService,
  ) { }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new product' })
  @ApiResponse({ status: 201, description: 'New product created', type: Product })
  @ApiBadRequestResponse({ description: 'Bad request' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Found products', type: [Product] })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findAll() {
    return await this.productService.findAll();
  }

  @Post('/search')
  @ApiOperation({ summary: 'Search for product' })
  @ApiResponse({ status: 200, description: 'List of products found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @HttpCode(200)
  async find(@Body() findProductDto: FindProductDto) {
    const [results, count] = await this.productService.find(findProductDto);
    return {
      data: results,
      count,
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product info' })
  @ApiResponse({ status: 200, description: 'Product info', type: Product })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async findOne(@Param('id') id: string) {

    const product = await this.productService.findOne(+id);

    return {
      ...product,
      breadcrumbs: [...await this.categoryService.findCategoryPath(product.category.mId), { mId: 0, mName: product.mName, mSlug: product.mSlug }],
    }
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({ status: 200, description: 'Product updated', type: Product })
  @ApiBadRequestResponse({ description: 'Bad request' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({ status: 200, description: 'Product deleted', type: Product })
  @ApiBadRequestResponse({ description: 'Bad request' })
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @Post('/:id/variant')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new variant for product' })
  @ApiResponse({ status: 201, description: 'Variant created', type: ProductVariant })
  @ApiBadRequestResponse({ description: 'Bad request' })
  createVariant(@Param('id') productId: string, @Body() createProductVariantDto: CreateProductVariantDto) {
    return this.productVariantService.create(+productId, createProductVariantDto);
  }

  @Get('/:id/variant')
  @ApiOperation({ summary: 'Get all variants of product' })
  @ApiResponse({ status: 200, description: 'List of product variants', type: ProductVariant })
  findVariantOfProduct(@Param('id') productId: string) {
    return this.productVariantService.findAllVariantOfProduct(+productId)
  }

  @Get('/:id/variant/:sku')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get variant info' })
  @ApiResponse({ status: 200, description: 'Variant info', type: ProductVariant })
  async findVariantBySku(@Param('id') productId: string, @Param('sku') sku: string) {
    return await this.productVariantService.findVariantBySku(+productId, sku);
  }

  @Patch('/:id/variant/:sku')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update variant info' })
  @ApiResponse({ status: 200, description: 'Product variant info updated', type: ProductVariant })
  @ApiBadRequestResponse({ description: 'Bad request' })
  updateVariant(@Param('id') productId: string, @Param('sku') sku: string, @Body() updateProductVariantDto: UpdateProductVariantDto) {
    return this.productVariantService.update(+productId, sku, updateProductVariantDto);
  }

  @Delete('/:id/variant/:sku')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete variant' })
  @ApiResponse({ status: 200, description: 'Product variant deleted' })
  deleteVariant(@Param('id') productId: string, @Param('sku') sku: string) {
    return this.productVariantService.delete(+productId, sku)
  }
}
