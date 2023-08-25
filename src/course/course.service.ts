import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { errorResponse, successResponse } from 'src/utils/responses';
import { Repository } from 'typeorm';
import courseList from '../courselists/uwcoursesf23.json';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    public courseRepo: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    Logger.log('Creating a new course');
    try {
      const newCourse = await this.courseRepo.insert(createCourseDto);
      return successResponse(
        200,
        'Created new course',
        newCourse.generatedMaps,
      );
    } catch (error) {
      console.log(error.detail);
    }
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

  async massUpload() {
    courseList.forEach((course_info) => {
      const newEntry = {
        course_code: course_info.course_code,
        course_name: course_info.name,
        semester: 'F23',
      };
      this.courseRepo
        .createQueryBuilder()
        .insert()
        .into(Course)
        .values(newEntry)
        .orIgnore()
        .execute();
    });
  }

  async remove(id: number) {
    Logger.log(`Deleting course ${id}`);
    await this.courseRepo.delete(id);
    return successResponse(200, `Deleted course ${id}`);
  }
}
