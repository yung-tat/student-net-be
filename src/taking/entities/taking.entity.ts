import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['user_id', 'course_id'])
export class Taking {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  course_id: number;
}
