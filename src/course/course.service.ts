import { Injectable, Logger } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { errorResponse, successResponse } from 'src/utils/responses';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    public courseRepo: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    Logger.log('Creating a new course');
    const newCourse = await this.courseRepo.insert(createCourseDto);
    return successResponse(200, 'Created new user', newCourse.generatedMaps);
  }

  async findAll() {
    Logger.log('Getting courses');
    const courseList = await this.courseRepo.findAndCount();
    return successResponse(200, 'Got courses', {
      courses: courseList[0],
      count: courseList[1],
    });
  }

  async findOne(id: number) {
    Logger.log(`Getting course by id ${id}`);
    const course = await this.courseRepo.find({
      where: {
        id: id,
      },
    });
    if (course.length === 0) {
      return errorResponse(404, `Could not find course ${id}`);
    }
    return successResponse(200, 'Got course', course);
  }

  // update(id: number, updateCourseDto: UpdateCourseDto) {
  //   return `This action updates a #${id} course`;
  // }

  async remove(id: number) {
    Logger.log(`Deleting course ${id}`);
    await this.courseRepo.delete(id);
    return successResponse(200, `Deleted course ${id}`);
  }
}
