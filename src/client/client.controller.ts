import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './client.dto.create';
import { UpdateClientDto } from './client.dto.update';
import { ClientService } from '../shared/services/client.service';
import { Client } from '../shared/interfaces/client.interface';
import { AuthGuard } from '@nestjs/passport';
import { BorneService } from '../shared/services/borne.service';
import { Borne } from '../shared/interfaces/borne.interface';
import { OffersService } from '../shared/services/offers.service';
import { Offer } from '../shared/interfaces/offers.interface';
import { clientSchema } from 'src/shared/schemas/client.schema';

@UseGuards(AuthGuard('jwt'))
@Controller('client')
export class ClientController {

  constructor(
    private readonly borneService: BorneService,
    private readonly clientsService: ClientService,
    private readonly offerService: OffersService,
  ) {
  }

  @Get()
  async findAll(): Promise<Client[]> {
    return this.clientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Client> {
    return this.clientsService.findOne(id);
  }

  @Post()
  create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientsService.create(createClientDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Client> {
    return this.clientsService.delete(id);
  }

  @Put(':id')
  update(@Body() updateClientDto: UpdateClientDto, @Param('id') id): Promise<Client> {
    return this.clientsService.update(id, updateClientDto);
  }

  @Put(':idClient/bornes/:idBorne')
  async createBorne(@Param('idClient') idClient: string,
                    @Param('idBorne') idBorne: string): Promise<Client> {
    const client: Client = await this.clientsService.findOne(idClient);
    const borne: Borne = await this.borneService.findOne(idBorne);
    client.bornes.push(borne);
    await client.save();
    return client;
  }

  @Put(':idClient/offer/:idOffer')
  async createOffer(@Param('idClient') idClient: string,
                    @Param('idOffer') idOffer: string): Promise < Client > {
    const client: Client = await this.clientsService.findOne(idClient);
    const offer: Offer = await this.offerService.findOne(idOffer);
    client.offer.push(offer);
    await client.save();
    return client;
  }
  @Delete(':idClient/bornes/:idBorne')
  async deleteBorne(@Param('idClient') idClient: string,
                    @Param('idBorne') idBorne: string): Promise<Client> {
    return this.clientsService.deleteBorne(idClient, idBorne);
  }
}
