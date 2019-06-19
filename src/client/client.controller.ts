import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CreateClientDto } from './client.dto.create';
import { UpdateClientDto } from './client.dto.update';
import { ClientService } from './client.service';
import { Client } from './client.interface';
import { AuthGuard } from '@nestjs/passport';
import { BorneService } from '../borne/borne.service';
import { Borne } from '../borne/interfaces/borne.interface';

@UseGuards(AuthGuard('jwt'))
@Controller('client')
export class ClientController {

  constructor(
    private readonly borneService: BorneService,
    private readonly clientsService: ClientService,
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
}
