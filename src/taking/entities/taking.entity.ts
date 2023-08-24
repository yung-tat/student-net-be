import { Course } from 'src/course/entities/course.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['user_id', 'course_id'])
export class Taking {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  @ManyToOne(() => User)
  user_id: number;

  @PrimaryColumn()
  @ManyToOne(() => Course)
  course_id: number;
}
