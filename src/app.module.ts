import { Module } from '@nestjs/common';
import { BorneModule } from './borne/borne.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';
import { OffersModule } from './offers/offers.module';
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(
        process.env.MONGOO || 'localhost',
        { useNewUrlParser: true, useFindAndModify: false }),
    BorneModule,
    ClientModule,
    OffersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
