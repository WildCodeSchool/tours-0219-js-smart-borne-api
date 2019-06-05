import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BorneService } from './borne.service';
import { BorneController } from './borne.controller';
import { borneSchema } from './schemas/borne.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'bornes', schema: borneSchema }])],
  providers: [BorneService],
  controllers: [
    BorneController,
  ],
})
export class BorneModule {
}
