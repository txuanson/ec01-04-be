import { PrismaService } from '@/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@Injectable()
export class ManufacturerService {

  constructor(
    private prisma: PrismaService
  ) { }

  async create(createManufacturerDto: CreateManufacturerDto) {
    try {
      return await this.prisma.manufacturer.create({
        data: {
          ...createManufacturerDto
        }
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new BadRequestException(`Manufacturer named \`${createManufacturerDto.mName}\` already exists`);
      }
    }
  }

  async findAll() {
    return await this.prisma.manufacturer.findMany()
  }

  async findOne(id: number) {
    return await this.prisma.manufacturer.findUnique({
      where: {
        mId: id
      }
    })
  }

  async update(id: number, updateManufacturerDto: UpdateManufacturerDto) {
    try {
      return await this.prisma.manufacturer.update({
        where: {
          mId: id
        },
        data: {
          ...updateManufacturerDto
        }
      })
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new BadRequestException(`Manufacturer named \`${updateManufacturerDto.mName}\` already exists`);
      }
    }
  }

  async remove(id: number) {
    return await this.prisma.manufacturer.delete({
      where: {
        mId: id
      }
    })
  }
}
