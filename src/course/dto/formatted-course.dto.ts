import { ApiProperty } from '@nestjs/swagger';

export class FormattedCourseDto {
  @ApiProperty({
    description: 'A formatted json file of courses to mass upload',
  })
  course: Express.Multer.File;
}
