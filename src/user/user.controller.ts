import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SetCourseListDTO } from 'src/taking/dto/set-course-list.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @Get('similar/:id')
  findSimilar(@Param('id') id: string) {
    return this.userService.findSimilar(+id);
  }

  @Post('setCourses')
  setCourses(@Body() setCourseListDTO: SetCourseListDTO) {
    return this.userService.setCourses(setCourseListDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
