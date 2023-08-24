import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of the student',
  })
  name: string;

  @ApiProperty({
    description: 'Email of the student',
  })
  email: string;
}
