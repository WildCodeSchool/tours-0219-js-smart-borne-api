import { Get, Post, Body, Put, Delete, Param, Controller, UseGuards, HttpException, HttpStatus }
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
    const clients = await this.clientsService.findClientByBorne(idBorne);
    const borne = await this.borneService.delete(idBorne);

    const promises = [];

    // tslint:disable-next-line:no-increment-decrement
    for (let i = 0; i < clients.length; i++) {
      clients[i].bornes.remove(borne);
      promises.push(clients[i].save());
    }

    return Promise.all(promises);
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
    const client: Client = await this.clientsService.findOne(idClient);
    const borne: Borne = await this.borneService.findOne(idBorne);
    console.log(borne);
    borne.client = client;
    await borne.save();
    return borne;
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
    const borne: Borne = await this.borneService.findOne(idBorne);
    const offers: Offer = await this.offerService.findOne(idOffer);

    const tab = [];
    // tslint:disable-next-line:no-increment-decrement
    for (let i = 0; i < borne.offers.length; i++) {
      tab.push(borne.offers[i]._id.toString());
    }

    const result = tab.filter(borne => borne === offers._id.toString());
    if (!result.length) {
      borne.offers.push(offers);
      await borne.save();
      return borne;
    }
    throw new HttpException('Not found', HttpStatus.BAD_REQUEST);
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

}
