import { PrismaService } from '@/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { slugify } from 'src/util/slugify';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@Injectable()
export class ManufacturerService {

  constructor(
    private prisma: PrismaService
  ) { }

  async create(createManufacturerDto: CreateManufacturerDto) {
    const newManufacturer = await this.prisma.manufacturer.create({
      data: {
        ...createManufacturerDto,
      }
    });

    return this.prisma.manufacturer.update({
      where: {
        mId: newManufacturer.mId
      },
      data: {
        mSlug: slugify(newManufacturer.mName) + '-' + newManufacturer.mId
      }
    });
  }

  async findAll() {
    return this.prisma.manufacturer.findMany()
  }

  async findOne(id: number) {
    return this.prisma.manufacturer.findUnique({
      where: {
        mId: id
      }
    })
  }

  async update(id: number, updateManufacturerDto: UpdateManufacturerDto) {
    return this.prisma.manufacturer.update({
      where: {
        mId: id
      },
      data: {
        ...updateManufacturerDto
      }
    })
  }

  async remove(id: number) {
    return this.prisma.manufacturer.delete({
      where: {
        mId: id
      }
    })
  }

  // async updateSlug() {
  //   const manufacturers = await this.prisma.manufacturer.findMany()
  //   console.log(manufacturers)
  //   for (const manufacturer of manufacturers) {
  //     await this.prisma.manufacturer.update({
  //       where: {
  //         mId: manufacturer.mId
  //       },
  //       data: {
  //         mSlug: slugify(manufacturer.mName) + '-' + manufacturer.mId
  //       }
  //     })
  //   }
  // }
}
