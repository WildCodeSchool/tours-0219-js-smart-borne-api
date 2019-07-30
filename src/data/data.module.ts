import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    SharedModule,
  ],
  controllers: [DataController],
  providers: [],
  exports: [],
})
export class DataModule {}
