import { Module } from '@nestjs/common';
import { BorneController } from './borne.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    SharedModule
  ],
  providers: [],
  controllers: [
    BorneController,
  ],
  exports: [],
})
export class BorneModule {
}
