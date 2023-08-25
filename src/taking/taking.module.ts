import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taking } from './entities/taking.entity';
import { TakingController } from './taking.controller';
import { TakingService } from './taking.service';

@Module({
  imports: [TypeOrmModule.forFeature([Taking])],
  controllers: [TakingController],
  providers: [TakingService],
  exports: [TakingService],
})
export class TakingModule {}
