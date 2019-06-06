import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { clientSchema } from './client.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Client', schema: clientSchema }])],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {
}
