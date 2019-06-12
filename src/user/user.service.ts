import { Injectable, Param } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
        @InjectModel('users') private readonly userModel: Model<User>,
    ) {
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id): Promise<User> {
    return await this.userModel.findOne({ _id: new ObjectId(id) });
  }

  async create(user: CreateUserDto): Promise<User> {
    user.password = await this.getHash(user.password);
    user.role = 'USER';
    const result = await this.userModel.create(user);
    delete result.password;
    return result;
  }

  async update(@Param('id') id: string, cardData: UpdateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, cardData);
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async findByUser(email: string, password: string): Promise<User> {
    return await this.userModel.findOne({
      email,
      password,
    });
  }

  async getHash(password: string | undefined): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  // tslint:disable-next-line:max-line-length
  async compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

}
