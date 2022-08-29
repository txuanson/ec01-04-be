import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, HttpCode, UseGuards } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { Manufacturer } from './entities/manufacturer.entity';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RolesGuard, UserRole } from '@/auth/guards/role.guard';
import { Roles } from '@/auth/decorator/role.decorator';

@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new manufacturer' })
  @ApiResponse({ status: 201, description: 'New manufacturer created', type: Manufacturer })
  @ApiBadRequestResponse({description: 'Bad request'})
  @HttpCode(201)
  create(@Body() createManufacturerDto: CreateManufacturerDto) {
    return this.manufacturerService.create(createManufacturerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all manufacturers' })
  @ApiResponse({ status: 200, description: 'List of manufacturers', type: Array<Manufacturer> })
  async findAll() {
    return await this.manufacturerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get manufacturer by id' })
  @ApiResponse({ status: 200, description: 'Manufacturer info', type: Manufacturer })
  findOne(@Param('id') id: string) {
    return this.manufacturerService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a manufacturer' })
  @ApiResponse({ status: 200, description: 'Manufacturer updated', type: Manufacturer })
  update(@Param('id') id: string, @Body() updateManufacturerDto: UpdateManufacturerDto) {
    return this.manufacturerService.update(+id, updateManufacturerDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a manufacturer' })
  @ApiResponse({ status: 200, description: 'Manufacturer deleted', type: Manufacturer })
  remove(@Param('id') id: string) {
    return this.manufacturerService.remove(+id);
  }
}
