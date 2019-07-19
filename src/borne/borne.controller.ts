import { Get, Post, Body, Put, Delete, Param, Controller, UseGuards, HttpException, HttpStatus, BadRequestException }
  from '@nestjs/common';
import { BorneService } from '../shared/services/borne.service';
import { CreateBorneDto } from './dto/create-borne.dto';
import { UpdateBorneDto } from './dto/update-borne.dto';
import { Borne } from '../shared/interfaces/borne.interface';
import { AuthGuard } from '@nestjs/passport';
import { Offer } from '../shared/interfaces/offers.interface';
import { OffersService } from '../shared/services/offers.service';
import { ClientService } from '../shared/services/client.service';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Client } from '../shared/interfaces/client.interface';

@UseGuards(AuthGuard('jwt'))
@ApiUseTags('borne')
@Controller('bornes')
export class BorneController {

  /**
   * @param borneService
   * @param offerService
   * @param clientsService
   */
  constructor(
    private readonly borneService: BorneService,
    private readonly offerService: OffersService,
    private readonly clientsService: ClientService) {
  }

  /**
   * List of borne
   */
  @ApiOperation({ title: 'Get all borne' })
  @ApiResponse({ status: 200, description: 'Return all borne.' })
  @Get()
  async findAll(): Promise<Borne[]> {
    return await this.borneService.findAll();
  }

  /**
   * Borne by Id
   * @param id
   */
  @ApiOperation({ title: 'Get borne by Id' })
  @ApiResponse({ status: 200, description: 'Return borne by Id.' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Borne> {
    return await this.borneService.findOne(id);
  }

  /**
   * Create borne
   * @param id
   * @param borneData
   */
  @ApiOperation({ title: 'Create borne' })
  @ApiResponse({ status: 201, description: 'The borne has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@Param('id') id: string, @Body() borneData: CreateBorneDto): Promise<Borne> {
    return this.borneService.create(id, borneData);
  }

  /**
   * Update borne by Id
   * @param id
   * @param borneData
   */
  @ApiOperation({ title: 'Update borne' })
  @ApiResponse({ status: 201, description: 'The borne has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() borneData: UpdateBorneDto): Promise<Borne> {
    return this.borneService.update(id, borneData);
  }

  /**
   * Delete borne by Id
   * @param idBorne
   */
  @ApiOperation({ title: 'Delete borne' })
  @ApiResponse({ status: 201, description: 'The borne has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':id')
  async delete(@Param('id') idBorne: string) {
    const borne = await this.borneService.delete(idBorne);
    const clients = await this.clientsService.removeBornes(idBorne, borne);
  }

  /**
 * Associate client at a borne
 * @param idClient
 * @param idBorne
 */
  @ApiOperation({ title: 'Associate client at borne' })
  @ApiResponse({ status: 201, description: 'The associate borne has been successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':idBorne/client/:idClient')
  async createClient(@Param('idClient') idClient: string,
                     @Param('idBorne') idBorne: string): Promise<Borne> {

    if (await this.borneService.hasClient(idBorne, idClient)
      || await this.clientsService.hasBorne(idBorne, idClient)) {
      throw new BadRequestException();
    }
    const borne: Borne = await this.borneService.findOne(idBorne);
     if (borne.client) {
       throw new BadRequestException();
     }

    const client: Client = await this.clientsService.findOne(idClient);
    await this.clientsService.addBorne(idClient, borne);
    return await this.borneService.addClient(idBorne, client);

  }

  /**
   * Associate borne to a offer
   * @param idOffer
   * @param idBorne
   */
  @ApiOperation({ title: 'Associate borne at offer' })
  @ApiResponse({ status: 201, description: 'The associate borne has been successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':idBorne/offer/:idOffer')
  async createOffer(@Param('idOffer') idOffer: string,
                    @Param('idBorne') idBorne: string): Promise<Borne> {
    if (await this.borneService.hasOffer(idBorne, idOffer)) {
      throw new BadRequestException();
    }
    const offer: Offer = await this.offerService.findOne(idOffer);
    return this.borneService.addOffer(idBorne, offer);
  }

  /**
   * @param idBorne
   * @param idOffer
   */
  @ApiOperation({ title: 'Delete offer by borne' })
  @ApiResponse({ status: 201, description: 'The offer has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':idBorne/offer/:idOffer')
  async deleteOffer(@Param('idBorne') idBorne: string,
                    @Param('idOffer') idOffer: string): Promise<Borne> {
    return this.borneService.deleteOffer(idBorne, idOffer);
  }

  /**
   * @param query
   */
  @ApiOperation({ title: 'Get query borne' })
  @ApiResponse({ status: 200, description: 'Return borne query' })
  @Get('search/:query')
  async queryBorne(@Param('query') query: string): Promise<Borne[]> {
    return this.borneService.queryBorne(query);
  }

  /**
 * @param idBorne
 * @param idClient
 */
  @ApiOperation({ title: 'Delete client by borne' })
  @ApiResponse({ status: 200, description: 'The offer has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':idBorne/clients/:idClient')
  async deleteClient(@Param('idBorne') idBorne: string,
                     @Param('idClient') idClient: string): Promise<any> {
    await this.borneService.deleteClient(idBorne, idClient);
    return Promise.resolve();
  }

}
