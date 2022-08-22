import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { ProductStatus } from "./constant/product-status.constant";
import { CreateProductVariantDto } from "./dto/create-product-variant.dto";
import { UpdateProductVariantDto } from "./dto/update-product-variant.dto";

@Injectable()
export class ProductVariantService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(productId: number, createProductVariantDto: CreateProductVariantDto) {
    return await this.prisma.productVariant.create({
      data: {
        mProductId: productId,
        ...createProductVariantDto
      }
    })
  }

  async findAllVariantOfProduct(productId: number) {
    return await this.prisma.productVariant.findMany({
      where: {
        mProductId: productId
      }
    })
  }

  async update(productId: number, sku: string, updateProductVariantDto: UpdateProductVariantDto) {
    return await this.prisma.productVariant.updateMany({
      where: {
        mProductId: productId,
        mSku: sku,
        mStatus: {
          not: ProductStatus.DELETED
        }
      },
      data: {
        ...updateProductVariantDto
      }
    })
  }

  async findManyBySkus(skus: string[]) {
    return this.prisma.productVariant.findMany({
      where: {
        mSku: {
          in: skus
        },
        mStatus: {
          notIn: [ProductStatus.DELETED, ProductStatus.HIDDEN, ProductStatus.OUT_OF_STOCK]
        }
      },
      select: {
        mStatus: true,
        mPrice: true,
        mSku: true,
        product: {
          select: {
            mName: true,
          }
        }
      }
    })
  }

  async delete(productId: number, sku: string) {
    return await this.prisma.productVariant.update({
      where: {
        mProductId_mSku: {
          mProductId: productId,
          mSku: sku
        }
      },
      data: {
        mStatus: ProductStatus.DELETED
      }
    })
  }
}