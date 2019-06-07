import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { offerSchema } from './schema/offers.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Offer', schema: offerSchema }]),
  ],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
