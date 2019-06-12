import { Module } from '@nestjs/common';
import { BorneModule } from './borne/borne.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';
import { OffersModule } from './offers/offers.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(
        process.env.MONGOO,
        { useNewUrlParser: true, useFindAndModify: false }),
    BorneModule,
    ClientModule,
    OffersModule,
    AuthModule,
    UserModule,
    ProfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
