import { Test, TestingModule } from '@nestjs/testing';
import { TakingController } from './taking.controller';
import { TakingService } from './taking.service';

describe('TakingController', () => {
  let controller: TakingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TakingController],
      providers: [TakingService],
    }).compile();

    controller = module.get<TakingController>(TakingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
