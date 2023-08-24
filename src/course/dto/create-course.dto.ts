import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Name of the course',
  })
  course_name: string;

  @ApiProperty({
    description: 'The university given course code',
  })
  course_code: string;

  @ApiProperty({
    description:
      'The current semester in the form (F|S|W)(last 2 digits of year)',
  })
  semester: string;
}
