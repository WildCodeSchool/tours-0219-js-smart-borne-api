import { Module } from '@nestjs/common';
import { BorneModule } from './borne/borne.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';
import { OffersModule } from './offers/offers.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthParamsIdGuard } from './shared/guards/user.guard';
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
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthParamsIdGuard,
    },
  ],
})
export class AppModule {
}
