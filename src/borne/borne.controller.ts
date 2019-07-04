import { Get, Post, Body, Put, Delete, Param, Controller, UseGuards } from '@nestjs/common';
import { BorneService } from '../shared/services/borne.service';
import { CreateBorneDto } from './dto/create-borne.dto';
import { UpdateBorneDto } from './dto/update-borne.dto';
import { Borne } from '../shared/interfaces/borne.interface';
import { AuthGuard } from '@nestjs/passport';
import { Offer } from '../shared/interfaces/offers.interface';
import { OffersService } from '../shared/services/offers.service';
import { Client } from '../shared/interfaces/client.interface';
import { ClientService } from '../shared/services/client.service';

@UseGuards(AuthGuard('jwt'))
@Controller('bornes')
export class BorneController {

  constructor(
    private readonly borneService: BorneService,
    private readonly offerService: OffersService,
    private readonly clientsService: ClientService) {
  }

  @Get()
  async findAll(): Promise<Borne[]> {
    return await this.borneService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Borne> {
    return await this.borneService.findOne(id);
  }

  @Post()
  async create(@Param('id') id: string, @Body() borneData: CreateBorneDto): Promise<Borne> {
    return this.borneService.create(id, borneData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() borneData: UpdateBorneDto): Promise<Borne> {
    return this.borneService.update(id, borneData);
  }

  @Delete(':id')
  async delete(@Param('id') idBorne: string) {
    const clients = await this.clientsService.findClientByBorne(idBorne);
    const borne = await this.borneService.delete(idBorne);

    const promises = [];

    for (let i = 0; i < clients.length ;  i++) {
      clients[i].bornes.remove(borne);
      promises.push(clients[i].save());
    }

    return Promise.all(promises);
  }

  @Put(':idBorne/offer/:idOffer')
  async createOffer(@Param('idOffer') idOffer: string,
                    @Param('idBorne') idBorne: string): Promise<Borne> {
    const borne: Borne = await this.borneService.findOne(idBorne);
    const offers: Offer = await this.offerService.findOne(idOffer);
    borne.offers.push(offers);
    await borne.save();
    return borne;
  }
  // @Delete(':idBorne/client/:idClient')
  // async deleteBorne(@Param('idClient') idClient: string,
  //                   @Param('idBorne') idBorne: string): Promise<Client> {
  //   const client: Client = await this.clientsService.findOne(idClient);

  //   const borne: Borne = await this.borneService.findOne(idBorne);
  //   client.bornes.remove(borne);
  //   // const borne = client.bornes.id(idBorne);

  //   // if (!borne) throw new NotFoundException();

  //   // await borne.remove();
  //   await client.save();
  //   return client;
  // }


}
