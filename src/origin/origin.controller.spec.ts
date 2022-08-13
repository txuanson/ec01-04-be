import { Test, TestingModule } from '@nestjs/testing';
import { OriginController } from './origin.controller';
import { OriginService } from './origin.service';

describe('OriginController', () => {
  let controller: OriginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OriginController],
      providers: [OriginService],
    }).compile();

    controller = module.get<OriginController>(OriginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
