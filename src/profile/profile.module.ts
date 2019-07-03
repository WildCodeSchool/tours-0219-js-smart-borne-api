import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileController } from './profile.controller';
import { userSchema } from '../shared/schemas/user.shema';
import { UserService } from '../shared/services/user.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    SharedModule
  ],
  providers: [],
  controllers: [
    ProfileController,
  ],
})
export class ProfileModule {
}
