import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Taking } from './entities/taking.entity';
import { Repository } from 'typeorm';
import { SetCourseListDTO } from './dto/set-course-list.dto';
import { successResponse } from 'src/utils/responses';

@Injectable()
export class TakingService {
  constructor(
    @InjectRepository(Taking)
    public takingRepo: Repository<Taking>,
  ) {}

  async setStudentCourses(setCourseListDTO: SetCourseListDTO) {
    const addedCourses = [];
    const deletedCourses = [];

    // Get courses of the student
    const studentCourseList = await this.takingRepo.find({
      where: {
        user_id: setCourseListDTO.student_id,
      },
    });
    studentCourseList.forEach(async (course) => {
      // If a course is missing from the new list
      if (!setCourseListDTO.course_ids.includes(course.course_id)) {
        // Remove it
        deletedCourses.push(course.id);
        await this.takingRepo.delete(course.id);
      }
    });

    // For each new course
    setCourseListDTO.course_ids.forEach(async (course_id) => {
      // Check to see if a relation exists in the db
      const course = await this.takingRepo.find({
        where: {
          course_id: course_id,
          user_id: setCourseListDTO.student_id,
        },
      });
      // If so, change nothing
      if (course.length !== 0) return;
      // If it doesn't, add it
      await this.takingRepo.insert({
        user_id: setCourseListDTO.student_id,
        course_id: course_id,
      });
      addedCourses.push(course_id);
    });

    return successResponse(200, 'Successfully updated courses', {
      added_courses: addedCourses,
      removed_courses: deletedCourses,
    });
  }

  async getSimilarStudents(student_id: number) {
    // Get course list of student
    const studentCourseList = await this.takingRepo.find({
      where: {
        user_id: student_id,
      },
    });
    // Main query
    const similarStudentIds = await this.takingRepo
      .createQueryBuilder()
      .select('taking.user_id, COUNT(taking.course_id) as courses')
      .from(Taking, 'taking')
      .where('user_id != :current && course_id IN (:...courses) ', {
        current: student_id,
        courses: studentCourseList.map((course) => course.course_id),
      })
      .getRawMany();
    return successResponse(200, 'Queried similar students', similarStudentIds);
  }
}
