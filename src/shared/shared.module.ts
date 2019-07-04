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

// DATA
import { dataSchema } from './schemas/data.schema';
import { DataService } from './services/data.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Offers', schema: offerSchema },
      { name: 'Clients', schema: clientSchema },
      { name: 'Bornes', schema: borneSchema },
      { name: 'Users', schema: userSchema },
      { name: 'Datas', schema: dataSchema },
    ]),
  ],
  providers: [OffersService, ClientService, BorneService, UserService, DataService],
  exports: [OffersService, ClientService, BorneService, UserService, DataService],
})
export class SharedModule { }
