import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    private prisma: PrismaService
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    if (createCategoryDto.mParentCategoryId === null) {
      return await this.prisma.$transaction(async () => {
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
        return newCategory;
      })
    }

    return await this.prisma.$transaction(async () => {
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
            gt: parent.mRightNode
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
          mLeftNode: parent.mRightNode + 1,
          mRightNode: parent.mRightNode + 2,
          mParent: createCategoryDto.mParentCategoryId
        }
      })

      return category;
    })
  }

  async findAll() {
    return await this.prisma.category.findMany({
      where: {
        mParent: null
      },
      include: {
        childCategories: true
      }
    })
  }

  async findOne(id: number) {
    return await this.prisma.category.findUnique({
      where: {
        mId: id
      },
      include: {
        childCategories: true,
        parentCategory: true
      }
    })
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: number) {
    return await this.prisma.category.delete({
      where: {
        mId: id
      }
    })
  }
}
