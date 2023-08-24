import { Test, TestingModule } from '@nestjs/testing';
import { TakingService } from './taking.service';

describe('TakingService', () => {
  let service: TakingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TakingService],
    }).compile();

    service = module.get<TakingService>(TakingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
