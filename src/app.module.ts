import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { User } from './user/entities/user.entity';
import { Course } from './course/entities/course.entity';
import { TakingModule } from './taking/taking.module';
import { Taking } from './taking/entities/taking.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'postgres',
      username: 'postgres',
      entities: [User, Course, Taking],
      migrations: ['./migrations/*'],
      synchronize: true,
      logging: true,
    }),
    UserModule,
    CourseModule,
    TakingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
