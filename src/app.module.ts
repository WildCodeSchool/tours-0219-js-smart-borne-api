import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BorneModule } from './borne/borne.module';

@Module({
  imports: [
    MongooseModule.forRoot(
        process.env.MONGOO,
        { useNewUrlParser: true, useFindAndModify: false }),
    BorneModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
