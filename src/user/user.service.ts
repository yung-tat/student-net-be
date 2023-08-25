import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SetCourseListDTO } from 'src/taking/dto/set-course-list.dto';
import { TakingService } from 'src/taking/taking.service';
import { errorResponse, successResponse } from 'src/utils/responses';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    public userRepo: Repository<User>,
  ) {}

  @Inject(TakingService)
  private takingService: TakingService;

  async create(createUserDto: CreateUserDto) {
    Logger.log('Creating a new user');
    // eslint-disable-next-line prettier/prettier
    const emailRegex = new RegExp('.*@uwaterloo.ca');
    if (!emailRegex.test(createUserDto.email)) {
      Logger.log('Invalid email when creating user');
      return errorResponse(422, 'Invalid Email');
    }
    const newUser = await this.userRepo.insert(createUserDto);
    return successResponse(200, 'Created new user', newUser.generatedMaps);
  }

  async findAll() {
    Logger.log('Getting users');
    const userList = await this.userRepo.findAndCount();
    return successResponse(200, 'Got users', {
      users: userList[0],
      count: userList[1],
    });
  }

  async findOne(id: number) {
    Logger.log(`Getting user by id (${id})`);
    const user = await this.userRepo.find({
      where: {
        id: id,
      },
    });
    if (user.length === 0) {
      return errorResponse(404, `Could not find user ${id}`);
    }
    return successResponse(200, 'Got user', user);
  }

  async findSimilar(id: number) {
    Logger.log(`Getting similar students to id ${id}`);
    const similarStudentIds = await this.takingService.getSimilarStudents(id);
    return successResponse(
      200,
      `Found ${similarStudentIds.length} similar students`,
      similarStudentIds,
    );
  }

  async setCourses(setCourseListDTO: SetCourseListDTO) {
    Logger.log(`Setting courses for id ${setCourseListDTO.student_id}`);
    this.takingService.setStudentCourses(setCourseListDTO);
  }

  async remove(id: number) {
    Logger.log(`Deleting user ${id}`);
    await this.userRepo.delete(id);
    return successResponse(200, `Deleted user ${id}`);
  }
}
