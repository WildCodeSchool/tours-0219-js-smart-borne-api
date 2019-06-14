import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileController } from './profile.controller';
import { userSchema } from '../user/schemas/user.shema';
import { UserService } from '../user/user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'users', schema: userSchema }])],
  providers: [UserService],
  controllers: [
    ProfileController,
  ],
})
export class ProfileModule {
}
