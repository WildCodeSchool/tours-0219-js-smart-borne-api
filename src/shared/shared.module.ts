import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//OFFERS
import { OffersService } from './services/offers.service';
import { offerSchema } from './schemas/offers.schema';

//CLIENT
import { ClientService } from './services/client.service';
import { clientSchema } from './schemas/client.schema';

//BORNES
import { BorneService } from './services/borne.service';
import { borneSchema } from './schemas/borne.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Offer', schema: offerSchema }]),
        MongooseModule.forFeature([{ name: 'Client', schema: clientSchema }]),
        MongooseModule.forFeature([{ name: 'bornes', schema: borneSchema }])],
    providers: [OffersService, ClientService, BorneService],
    exports: [
        OffersService, ClientService, BorneService
    ],
})
export class SharedModule { }
