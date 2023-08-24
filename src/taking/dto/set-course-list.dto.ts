import { ApiProperty } from '@nestjs/swagger';

export class SetCourseListDTO {
  @ApiProperty({
    description: 'Student to set courses for',
  })
  student_id: number;

  @ApiProperty({
    description: 'List of course ids to set',
  })
  course_ids: number[];
}
