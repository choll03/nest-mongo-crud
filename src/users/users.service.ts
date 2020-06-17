import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/user.create.dto';
import { LoginUserDto } from './dto/user-login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/users.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findOne(options?: object): Promise<UserDto> {
    return await this.userModel.findOne(options);
  }

  async findByLogin({ email, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userModel.find({email});

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = bcrypt.compare(user.password, password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async findByPayload({ email }: any): Promise<UserDto> {
    return await this.userModel.findOne({email});
  }

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { name, password, email } = userDto;

    // check if the user exists in the db
    const userInDb = await this.userModel.findOne({ email });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userModel(userDto);
    return user.save();
  }

  private _sanitizeUser(user: User) {
    delete user.password;
    return user;
  }
}