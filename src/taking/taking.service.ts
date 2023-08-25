import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { successResponse } from 'src/utils/responses';
import { Repository } from 'typeorm';
import { SetCourseListDTO } from './dto/set-course-list.dto';
import { Taking } from './entities/taking.entity';

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

  // Helper function for user service
  async getSimilarStudents(student_id: number) {
    const similarStudentIds = await this.takingRepo.query(
      `SELECT t1.user_id as student_id, COUNT(t1.course_id) as courses
      FROM TAKING as t1, 
        (SELECT t.course_id
        FROM TAKING as t
        WHERE t.user_id = ${student_id}) as t2
      WHERE t1.user_id != ${student_id} AND t1.course_id = t2.course_id
      GROUP BY t1.user_id
      HAVING COUNT(t1.course_id) > 0`,
    );
    return similarStudentIds;
  }
}
