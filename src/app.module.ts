import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';
import { OffersModule } from './offers/offers.module';
import { BorneModule } from './borne/borne.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { DataModule } from './data/data.module';

require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(
        process.env.DBURI,
        { useNewUrlParser: true, useFindAndModify: false }),
    BorneModule,
    ClientModule,
    OffersModule,
    AuthModule,
    UserModule,
    ProfileModule,
    DataModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
