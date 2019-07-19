import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../../user/dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';
import { User } from '../interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  /**
   * @param userModel
   */
  constructor(
        @InjectModel('Users') private readonly userModel: Model<User>,
    ) {
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  /**
   * @param id
   */
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: new ObjectId(id) });
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  /**
   * @param user
   */
  async create(user: CreateUserDto): Promise<User> {
    user.password = await this.getHash(user.password);
    const result = await this.userModel.create(user);
    delete result.password;
    return result;
  }

  /**
   * @param id
   * @param cardData
   */
  async update(@Param('id') id: string, cardData: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, cardData);
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  /**
   * @param id
   */
  async delete(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndRemove({ id });
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  /**
   * @param email
   */
  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  /**
   * @param email
   * @param password
   */
  async findByUser(email: string, password: string): Promise<User> {
    return await this.userModel.findOne({
      email,
      password,
    });
  }

  /**
   * @param password
   */
  async getHash(password: string | undefined): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  /**
   * @param password
   * @param hash
   */
  // tslint:disable-next-line:max-line-length
  async compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

}
