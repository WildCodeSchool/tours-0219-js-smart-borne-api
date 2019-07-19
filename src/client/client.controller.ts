import {
  Controller, Get, Post, Put, Delete, Body, Param, UseGuards,
  BadRequestException
}
  from '@nestjs/common';
import { CreateClientDto } from './client.dto.create';
import { UpdateClientDto } from './client.dto.update';
import { ClientService } from '../shared/services/client.service';
import { Client } from '../shared/interfaces/client.interface';
import { AuthGuard } from '@nestjs/passport';
import { BorneService } from '../shared/services/borne.service';
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
  async delete(@Param('id') idClient: string) {
    const client = await this.clientsService.delete(idClient);
    const promises = client.bornes.map(borne => {
      return this.borneService.deleteClient(borne._id, idClient);
    });
    return Promise.all(promises);
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
   * Associate client at a offer
   * @param idClient
   * @param idOffer
   */
  @ApiOperation({ title: 'Associate client at offer' })
  @ApiResponse({ status: 201, description: 'The associate offer has been successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':idClient/offer/:idOffer')
  async createOffer(@Param('idClient') idClient: string,
    @Param('idOffer') idOffer: string): Promise<Client> {
    if (await this.clientsService.hasOffer(idOffer, idClient)) {
      throw new BadRequestException();
    }
    const offer: Offer = await this.offerService.findOne(idOffer);
    return this.clientsService.addOffer(idClient, offer);
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
