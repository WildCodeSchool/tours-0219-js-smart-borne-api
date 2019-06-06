import { Module } from '@nestjs/common';
import { BorneModule } from './borne/borne.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
    MongooseModule.forRoot(
        process.env.MONGOO || 'localhost',
        { useNewUrlParser: true, useFindAndModify: false }),
    BorneModule,
    ClientModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
