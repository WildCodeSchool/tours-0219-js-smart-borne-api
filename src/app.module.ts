import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';
import { ClientController } from './client/client.controller';

@Module({
  imports: [
    // tslint:disable-next-line: max-line-length
    MongooseModule.forRoot('mongodb+srv://Gordian:motdepasse@cluster0-yb41y.mongodb.net/test?retryWrites=true&w=majority',
                           { useNewUrlParser: true, useFindAndModify: false }),
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
