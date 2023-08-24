import { Module } from '@nestjs/common';
import { TakingService } from './taking.service';
import { TakingController } from './taking.controller';

@Module({
  controllers: [TakingController],
  providers: [TakingService],
})
export class TakingModule {}
