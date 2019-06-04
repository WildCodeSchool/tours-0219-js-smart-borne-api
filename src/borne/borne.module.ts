import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {BorneService} from "./borne.service";
import {BorneController} from "./borne.controller";
import {borneSchema} from "./schemas/borne.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'bornes', schema: borneSchema }])],
  providers: [BorneService],
  controllers: [
    BorneController
  ]
})
export class BorneModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        {path: 'bornes', method: RequestMethod.GET},
        {path: 'bornes', method: RequestMethod.POST},
        {path: 'bornes/:id', method: RequestMethod.DELETE},
        {path: 'bornes/:id', method: RequestMethod.PUT}
      )
  }
}
