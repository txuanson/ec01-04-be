import { OmitType } from '@nestjs/swagger';
import { CreateProductVariantDto } from './create-product-variant.dto';

export class UpdateProductVariantDto extends OmitType(CreateProductVariantDto, ['mSku'] as const) {}
