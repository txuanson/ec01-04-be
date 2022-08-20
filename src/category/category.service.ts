import { PrismaService } from '@/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { slugify } from 'src/util/slugify';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    private prisma: PrismaService
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    if (createCategoryDto.mParentCategoryId === null) {
      return this.prisma.$transaction(async () => {
        const maxNode = await this.prisma.category.aggregate({
          _max: {
            mRightNode: true
          }
        });

        const newCategory = await this.prisma.category.create({
          data: {
            mName: createCategoryDto.mName,
            mDesc: createCategoryDto.mDesc,
            mLeftNode: maxNode._max.mRightNode + 1,
            mRightNode: maxNode._max.mRightNode + 2,
          }
        })

        await this.prisma.category.update({
          where: {
            mId: newCategory.mId
          },
          data: {
            mSlug: slugify(newCategory.mName) + '-' + newCategory.mId
          }
        });

        return newCategory;
      })
    }

    return this.prisma.$transaction(async () => {
      const parent = await this.prisma.category.findUnique({
        where: {
          mId: createCategoryDto.mParentCategoryId
        }
      });

      await this.prisma.category.updateMany({
        data: {
          mRightNode: {
            increment: 2
          }
        },
        where: {
          mRightNode: {
            gte: parent.mRightNode
          }
        }
      })

      await this.prisma.category.updateMany({
        data: {
          mLeftNode: {
            increment: 2
          }
        },
        where: {
          mLeftNode: {
            gt: parent.mRightNode
          }
        }
      })

      const category = await this.prisma.category.create({
        data: {
          mName: createCategoryDto.mName,
          mDesc: createCategoryDto.mDesc,
          mLeftNode: parent.mRightNode,
          mRightNode: parent.mRightNode + 1,
          mParent: createCategoryDto.mParentCategoryId,
        }
      })

      const newCategory = await this.prisma.category.update({
        where: {
          mId: category.mId
        },
        data: {
          mSlug: slugify(category.mName) + '-' + category.mId
        }
      })

      return newCategory;
    })
  }

  async findAll() {
    return this.prisma.category.findMany({
      where: {
        mParent: null
      },
      select: {
        mId: true,
        mName: true,
        mDesc: true,
        childCategories: {
          select: {
            mId: true,
            mName: true,
          }
        },
      }
    })
  }

  async findOne(id: number) {
    return this.prisma.category.findUnique({
      where: {
        mId: id
      },
      select: {
        mId: true,
        mName: true,
        mDesc: true,
        childCategories: {
          select: {
            mId: true,
            mName: true,
          }
        },
      }
    })
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: {
        mId: id
      },
      data: {
        mName: updateCategoryDto.mName,
        mDesc: updateCategoryDto.mDesc
      }
    });
  }

  async findCategoryPath(id: number) {
    const thisCategory = await this.prisma.category.findUnique({
      where: {
        mId: id,
      },
      select: {
        mLeftNode: true,
      }
    });

    return this.prisma.category.findMany({
      where: {
        mLeftNode: {
          lte: thisCategory.mLeftNode
        },
        mRightNode: {
          gte: thisCategory.mLeftNode
        }
      },
      select: {
        mId: true,
        mName: true,
        mSlug: true,
      },
      orderBy: {
        mLeftNode: 'asc'
      }
    })
  }

  async remove(id: number) {
    return this.prisma.category.delete({
      where: {
        mId: id
      }
    })
  }

  // async updateSlug() {
  //   const categories = await this.prisma.category.findMany({
  //     select: {
  //       mId: true,
  //       mName: true,
  //     }
  //   })
  //   for (let i = 0; i < categories.length; i++) {
  //     const category = categories[i];
  //     const slug = slugify(category.mName);
  //     await this.prisma.category.update({
  //       where: {
  //         mId: category.mId
  //       },
  //       data: {
  //         mSlug: slug + '-' + category.mId
  //       }
  //     })
  //   }
  // }
}
