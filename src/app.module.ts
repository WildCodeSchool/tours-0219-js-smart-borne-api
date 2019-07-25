import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';
import { OffersModule } from './offers/offers.module';
import { BorneModule } from './borne/borne.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { DataController } from './data/data.controller';

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
  controllers: [DataController],
  providers: [],
})
export class AppModule {
}
