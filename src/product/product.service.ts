import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { slugify } from 'src/util/slugify';
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
    const newProduct = await this.prisma.product.create({
      data: {
        ...createProductDto
      }
    });

    const updateProduct = await this.prisma.product.update({
      where: {
        mId: newProduct.mId
      },
      data: {
        mSlug: slugify(newProduct.mName) + '-' + newProduct.mId
      }
    });
    return updateProduct;
  }

  async findAll(): Promise<any[]> {
    return this.prisma.product.findMany({
      where: {
        mStatus: {
          not: ProductStatus.DELETED
        }
      },
      include: {
        category: true,
        manufacturer: true,
        origin: true,
        variant: true
      },
      orderBy: {
        mModifiedAt: 'desc'
      }
    });
  }

  async find(findProductDto: FindProductDto) {
    const where = {
      ...(findProductDto.mName ? {
        mName: {
          search: findProductDto.mName
        }
      } : {})
      ,
      mStatus: {
        notIn: [ProductStatus.HIDDEN, ProductStatus.DELETED]
      },
      ...(findProductDto.category.length ? {
        mCategoryId: {
          in: findProductDto.category
        }
      } : {}),
      ...(findProductDto.manufacturer.length ? {
        mManuId: {
          in: findProductDto.manufacturer
        }
      } : {}),
      ...(findProductDto.origin.length ? {
        mOriginId: {
          in: findProductDto.origin
        }
      } : {})
    };
    return this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        select: {
          mId: true,
          mName: true,
          mDesc: true,
          mPhotos: true,
          mRatingCount: true,
          mAvgRating: true,
          mStatus: true,
          mSlug: true,
          variant: {
            where: {
              mStatus: ProductStatus.IN_STOCK
            }
          },
          origin: {
            select: {
              mId: true,
              mCountry: true,
              mFlag: true,
              mSlug: true,
            }
          },
          category: {
            select: {
              mId: true,
              mName: true,
              mSlug: true,
            }
          },
          manufacturer: {
            select: {
              mId: true,
              mSlug: true,
              mName: true,
              mLogo: true
            }
          }
        },
        orderBy: findProductDto.sort,
        skip: findProductDto.skip,
        take: findProductDto.pageSize
      }),
      this.prisma.product.count({
        where
      })
    ])
  }

  async findOne(id: number) {
    return this.prisma.product.findFirstOrThrow({
      where: {
        mId: id,
        mStatus: {
          notIn: [ProductStatus.HIDDEN, ProductStatus.DELETED]
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
        mSlug: true,
        variant: {
          where: {
            mStatus: {
              not: ProductStatus.DELETED
            }
          }
        },
        origin: {
          select: {
            mId: true,
            mSlug: true,
            mCountry: true,
            mFlag: true,
          }
        },
        category: {
          select: {
            mSlug: true,
            mId: true,
            mName: true,
          }
        },
        manufacturer: {
          select: {
            mId: true,
            mSlug: true,
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
    return this.prisma.product.updateMany({
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

  async updateSlug() {
    const products = await this.prisma.product.findMany();

    for (const product of products) {
      await this.prisma.product.update({
        where: {
          mId: product.mId
        },
        data: {
          mSlug: slugify(product.mName) + '-' + product.mId
        }
      })
    }
  }
}
