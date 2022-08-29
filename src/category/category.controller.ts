import { Roles } from '@/auth/decorator/role.decorator';
import { RolesGuard, UserRole } from '@/auth/guards/role.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, BadRequestException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new category' })
  @ApiResponse({ status: 201, description: 'New category created', type: Category })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @HttpCode(201)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories with depth' })
  @ApiResponse({ status: 200, description: 'List of all categories, sorted by left node (means parent are always on top of its children)', type: Array<Category> })
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findOne(+id);
  }

  @Get(':id/path')
  @ApiOperation({ summary: 'Get path of category' })
  @ApiResponse({ status: 200, description: 'Path of category', type: Array<Category> })
  async getCategoryPath(@Param('id') id: string) {
    return await this.categoryService.findCategoryPath(+id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({ status: 200, description: 'Category ', type: Category })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({ status: 200, description: 'Category deleted', type: Category })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
