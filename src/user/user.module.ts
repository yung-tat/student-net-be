import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TakingModule } from 'src/taking/taking.module';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TakingModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
