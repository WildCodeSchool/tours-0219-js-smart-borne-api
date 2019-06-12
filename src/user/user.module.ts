import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schemas/user.shema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'users', schema: userSchema }])],
  providers: [UserService],
  controllers: [
    UserController,
  ],
})
export class UserModule  {}
