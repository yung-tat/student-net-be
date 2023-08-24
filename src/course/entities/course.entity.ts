import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['course_name', 'course_code', 'semester'])
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ name: 'course_name' })
  course_name: string;

  @PrimaryColumn({ name: 'course_code' })
  course_code: string;

  @PrimaryColumn({ name: 'semester' })
  semester: string;
}
