import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    SharedModule
  ],
  controllers: [ClientController],
  providers: [],
})
export class ClientModule {
}
