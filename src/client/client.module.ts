import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { ClientSchema } from './client.schema';
@Module({
    imports: [MongooseModule.forFeature([{ name: 'Client', schema: ClientSchema }])],
    controllers: [ClientController],
    providers: [ClientService],
})
export class ClientModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply()
            .forRoutes(
                { path: 'client', method: RequestMethod.GET },
                { path: 'client', method: RequestMethod.POST },
                { path: 'client/:id', method: RequestMethod.DELETE },
                { path: 'client/:id', method: RequestMethod.PUT }
            )
    }
}
