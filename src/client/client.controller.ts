import {Controller, Get, Post, Put, Delete, Body, Param, UseGuards,
  HttpException, HttpStatus, HttpCode}
  from '@nestjs/common';
import { CreateClientDto } from './client.dto.create';
import { UpdateClientDto } from './client.dto.update';
import { ClientService } from '../shared/services/client.service';
import { Client } from '../shared/interfaces/client.interface';
import { AuthGuard } from '@nestjs/passport';
import { BorneService } from '../shared/services/borne.service';
import { Borne } from '../shared/interfaces/borne.interface';
import { OffersService } from '../shared/services/offers.service';
import { Offer } from '../shared/interfaces/offers.interface';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@ApiUseTags('client')
@Controller('client')
export class ClientController {

  /**
   * @param borneService
   * @param clientsService
   * @param offerService
   */
  constructor(
    private readonly borneService: BorneService,
    private readonly clientsService: ClientService,
    private readonly offerService: OffersService,
  ) {
  }

  /**
   * List of clients
   */
  @ApiOperation({ title: 'Get all client' })
  @ApiResponse({ status: 200, description: 'Return all client.' })
  @Get()
  async findAll(): Promise<Client[]> {
    return this.clientsService.findAll();
  }

  /**
   * Client by Id
   * @param id
   */
  @ApiOperation({ title: 'Get client by Id' })
  @ApiResponse({ status: 200, description: 'Return client by Id' })
  @Get(':id')
  findOne(@Param('id') id): Promise<Client> {
    return this.clientsService.findOne(id);
  }

  /**
   * Create client
   * @param createClientDto
   */
  @ApiOperation({ title: 'Create client' })
  @ApiResponse({ status: 201, description: 'The client has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientsService.create(createClientDto);
  }

  /**
   * Delete client by Id
   * @param id
   */
  @ApiOperation({ title: 'Delete client' })
  @ApiResponse({ status: 201, description: 'The client has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':id')
  delete(@Param('id') id): Promise<Client> {
    return this.clientsService.delete(id);
  }

  /**
   * Update client by Id
   * @param updateClientDto
   * @param id
   */
  @ApiOperation({ title: 'Update client' })
  @ApiResponse({ status: 201, description: 'The client has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':id')
  update(@Body() updateClientDto: UpdateClientDto, @Param('id') id): Promise<Client> {
    return this.clientsService.update(id, updateClientDto);
  }

  /**
   * Associate client at a borne
   * @param idClient
   * @param idBorne
   */
  @ApiOperation({ title: 'Associate borne at client' })
  @ApiResponse({ status: 201, description: 'The associate client has been successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':idClient/bornes/:idBorne')
  async createBorne(@Param('idClient') idClient: string,
                    @Param('idBorne') idBorne: string): Promise<Client> {
    const client: Client = await this.clientsService.findOne(idClient);
    const borne: Borne = await this.borneService.findOne(idBorne);

    const tab = [];
    // tslint:disable-next-line:no-increment-decrement
    for (let i = 0; i < client.bornes.length; i++) {
      tab.push(client.bornes[i]._id);
    }

    const result = tab.filter(client => client === borne._id.toString());
    if (!result.length) {
      client.bornes.push(borne);
      await client.save();
      return client;
    }
    throw new HttpException('Not found', HttpStatus.BAD_REQUEST);
  }

  /**
   * Associate client at a offer
   * @param idClient
   * @param idOffer
   */
  @ApiOperation({ title: 'Associate client at offer' })
  @ApiResponse({ status: 201, description: 'The associate offer has been successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':idClient/offer/:idOffer')
  async createOffer(@Param('idClient') idClient: string,
                    @Param('idOffer') idOffer: string): Promise < Client > {
    const client: Client = await this.clientsService.findOne(idClient);
    const offer: Offer = await this.offerService.findOne(idOffer);

    const tab = [];
    // tslint:disable-next-line:no-increment-decrement
    for (let i = 0; i < client.offer.length; i++) {
      tab.push(client.offer[i]._id.toString());
    }

    const result = tab.filter(borne => borne === offer._id.toString());
    if (!result.length) {
      client.offer.push(offer);
      await client.save();
      return client;
    }
    throw new HttpException('Not found', HttpStatus.BAD_REQUEST);
  }

  /**
   * Delete borne at a client
   * @param idClient
   * @param idBorne
   */
  @ApiOperation({ title: 'Delete client at borne' })
  @ApiResponse({ status: 201, description: 'The client has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':idClient/bornes/:idBorne')
  async deleteBorne(@Param('idClient') idClient: string,
                    @Param('idBorne') idBorne: string): Promise<Client> {
    return this.clientsService.deleteBorne(idClient, idBorne);
  }
  @Delete(':idClient/offer/:idOffer')
  async deleteOffer(@Param('idClient') idClient: string,
                    @Param('idOffer') idOffer: string): Promise<Client> {
    return this.clientsService.deleteOffer(idClient, idOffer);
  }

}
