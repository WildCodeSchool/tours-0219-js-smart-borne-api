import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OffersModule } from './offers/offers.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [OffersModule, MongooseModule.forRoot(
// tslint:disable-next-line: max-line-length
    'mongodb + srv://Cyprien:Cyprien321!@smartborneapitest-9euks.mongodb.net/test?retryWrites=true&w=majority',
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
