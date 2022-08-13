import { Module } from '@nestjs/common';
import { OriginService } from './origin.service';
import { OriginController } from './origin.controller';

@Module({
  controllers: [OriginController],
  providers: [OriginService]
})
export class OriginModule {}
