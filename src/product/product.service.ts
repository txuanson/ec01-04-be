import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ProductStatus } from './constant/product-status.constant';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(createProductDto: CreateProductDto) {
    return await this.prisma.product.create({
      data: {
        ...createProductDto,
        mStatus: ProductStatus.HIDE
      }
    })
  }

  async find(findProductDto: FindProductDto) {
    console.log(findProductDto)
    return await this.prisma.product.findMany({
      where: {
        ...(findProductDto.mName ? {
          mName: {
            search: findProductDto.mName
          }
        } : {})
        ,
        mStatus: {
          notIn: [ProductStatus.HIDE, ProductStatus.DELETED]
        },
        mManuId: {
          in: findProductDto.manufacturer
        },
        mCategoryId: {
          in: findProductDto.category
        },
        mOriginId: {
          in: findProductDto.origin
        }
      },
      select: {
        mId: true,
        mName: true,
        mDesc: true,
        mPhotos: true,
        mRatingCount: true,
        mAvgRating: true,
        mStatus: true,
        variant: true,
        origin: {
          select: {
            mId: true,
            mCountry: true,
            mFlag: true,
          }
        },
        category: {
          select: {
            mId: true,
            mName: true,
          }
        },
        manufacturer: {
          select: {
            mId: true,
            mName: true,
            mLogo: true
          }
        }
      },
      orderBy: findProductDto.sort,
      skip: findProductDto.skip,
      take: findProductDto.pageSize
    });
  }

  async findOne(id: number) {
    return await this.prisma.product.findFirstOrThrow({
      where: {
        mId: id,
        mStatus: {
          notIn: [ProductStatus.HIDE, ProductStatus.DELETED]
        }
      },
      select: {
        mId: true,
        mName: true,
        mDesc: true,
        mPhotos: true,
        mRatingCount: true,
        mAvgRating: true,
        mStatus: true,
        variant: true,
        origin: {
          select: {
            mId: true,
            mCountry: true,
            mFlag: true,
          }
        },
        category: {
          select: {
            mId: true,
            mName: true,
          }
        },
        manufacturer: {
          select: {
            mId: true,
            mName: true,
            mLogo: true
          }
        }
      }
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.prisma.product.update({
      where: {
        mId: id
      },
      data: {
        ...updateProductDto
      }
    });
  }

  async remove(id: number) {
    return await this.prisma.product.updateMany({
      where: {
        mId: id,
        mStatus: {
          not: ProductStatus.DELETED
        }
      },
      data: {
        mStatus: ProductStatus.DELETED
      }
    });
  }
}
