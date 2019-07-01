import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    SharedModule,
  ],
  controllers: [OffersController],
  providers: [],
  exports: [],
})
export class OffersModule {}
