import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// OFFERS
import { OffersService } from './services/offers.service';
import { offerSchema } from './schemas/offers.schema';

// CLIENT
import { ClientService } from './services/client.service';
import { clientSchema } from './schemas/client.schema';

// BORNES
import { BorneService } from './services/borne.service';
import { borneSchema } from './schemas/borne.schema';

//
import { userSchema } from './schemas/user.shema';
import { UserService } from './services/user.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Offers', schema: offerSchema },
            { name: 'Clients', schema: clientSchema },
            { name: 'Bornes', schema: borneSchema },
            { name: 'Users', schema: userSchema },
        ]),
    ],
    providers: [OffersService, ClientService, BorneService, UserService],
    exports: [OffersService, ClientService, BorneService, UserService],
})
export class SharedModule { }
