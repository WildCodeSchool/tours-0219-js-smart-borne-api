import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {BorneModule} from "./borne/borne.module";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://jocelyn:<pass>@clustergame-lefzw.mongodb.net/smart-borne?retryWrites=true',
      {useNewUrlParser: true, useFindAndModify: false}),
    BorneModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
