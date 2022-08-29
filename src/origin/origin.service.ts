import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { slugify } from 'src/util/slugify';
import { CreateOriginDto } from './dto/create-origin.dto';
import { UpdateOriginDto } from './dto/update-origin.dto';

@Injectable()
export class OriginService {

  constructor(
    private prisma: PrismaService
  ) { }

  async create(createOriginDto: CreateOriginDto) {
    const newOrigin = await this.prisma.origin.create({
      data: {
        ...createOriginDto
      }
    })

    return this.prisma.origin.update({
      where: {
        mId: newOrigin.mId
      },
      data: {
        mSlug: slugify(newOrigin.mCountry) + '-' + newOrigin.mId
      }
    });
  }

  async findAll() {
    return await this.prisma.origin.findMany({
      orderBy: {
        mModifiedAt: 'desc'
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.origin.findUnique({
      where: {
        mId: id
      }
    })
  }

  async update(id: number, updateOriginDto: UpdateOriginDto) {
    return await this.prisma.origin.update({
      where: {
        mId: id
      },
      data: {
        ...updateOriginDto
      }
    })
  }

  async remove(id: number) {
    return await this.prisma.origin.delete({
      where: {
        mId: id
      }
    })
  }

  // async updateSlug() {
  //   const origins = await this.prisma.origin.findMany();

  //   for (const origin of origins) {
  //     await this.prisma.origin.update({
  //       where: {
  //         mId: origin.mId
  //       },
  //       data: {
  //         mSlug: slugify(origin.mCountry) + '-' + origin.mId
  //       }
  //     })
  //   }
  // }
}
