import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  async remove(id: number) {
    Logger.log(`Deleting user ${id}`);
    await this.userRepo.delete(id);
    return successResponse(200, `Deleted user ${id}`);
  }
}
