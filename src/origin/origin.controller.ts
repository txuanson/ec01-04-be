import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { OriginService } from './origin.service';
import { CreateOriginDto } from './dto/create-origin.dto';
import { UpdateOriginDto } from './dto/update-origin.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Origin } from './entities/origin.entity';
import { Roles } from '@/auth/decorator/role.decorator';
import { RolesGuard, UserRole } from '@/auth/guards/role.guard';

@Controller('origin')
export class OriginController {
  constructor(private readonly originService: OriginService) { }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new origin' })
  @ApiResponse({ status: 201, description: 'New origin created', type: Origin })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @HttpCode(201)
  create(@Body() createOriginDto: CreateOriginDto) {
    return this.originService.create(createOriginDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all origins' })
  @ApiResponse({ status: 200, description: 'List of origins', type: Array<Origin> })
  async findAll() {
    return await this.originService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an origin by id' })
  @ApiResponse({ status: 200, description: 'Origin info', type: Origin })
  findOne(@Param('id') id: string) {
    return this.originService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an origin' })
  @ApiResponse({ status: 200, description: 'Origin updated', type: Origin })
  update(@Param('id') id: string, @Body() updateOriginDto: UpdateOriginDto) {
    return this.originService.update(+id, updateOriginDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an origin' })
  @ApiResponse({ status: 200, description: 'Origin deleted', type: Origin })
  remove(@Param('id') id: string) {
    return this.originService.remove(+id);
  }
}
