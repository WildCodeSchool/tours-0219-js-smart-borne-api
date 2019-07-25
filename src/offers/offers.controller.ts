import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param, UseGuards,
} from '@nestjs/common';
import { CreateOfferDto } from './DTO/create-offer.dto';
import { Offer } from '../shared/interfaces/offers.interface';
import { OffersService } from '../shared/services/offers.service';
import { AuthGuard } from '@nestjs/passport';
import { ClientService } from '../shared/services/client.service';
import { BorneService } from '../shared/services/borne.service';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import {UpdateOfferDto} from "./DTO/update-offer.dto";

@UseGuards(AuthGuard('jwt'))
@ApiUseTags('offer')
@Controller('offer')
export class OffersController {

  /**
   * @param offersService
   * @param clientsService
   * @param borneService
   */
  constructor(
    private readonly offersService: OffersService,
    private readonly clientsService: ClientService,
    private readonly borneService: BorneService) {}

  /**
   * List of offers
   */
  @ApiOperation({ title: 'Get all offers' })
  @ApiResponse({ status: 200, description: 'Return all offers.' })
  @Get()
  async findAll(): Promise<Offer[]> {
    return this.offersService.findAll();
  }

  /**
   * Create offer
   * @param id
   * @param createOfferDto
   */
  @ApiOperation({ title: 'Create offer' })
  @ApiResponse({ status: 201, description: 'The offer has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@Param('id') id: string, @Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offersService.create(id, createOfferDto);
  }

  /**
   * Offer by Id
   * @param id
   */
  @ApiOperation({ title: 'Get offer by Id' })
  @ApiResponse({ status: 200, description: 'Return offer by Id.' })
  @Get(':id')
  async findOne(@Param('id') id): Promise<Offer> {
    return this.offersService.findOne(id);
  }

  /**
   * @param idOffer
   */
  @ApiOperation({ title: 'Delete offer' })
  @ApiResponse({ status: 201, description: 'The offer has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':id')
  async delete(@Param('id') idOffer: string) {
    const offer = await this.offersService.delete(idOffer);
    const clients = await this.clientsService.findClientByOffer(idOffer);
    const bornes = await this.borneService.findBorneByOffer(idOffer);

    const promises = [];

    // tslint:disable-next-line:no-increment-decrement
    for (let i = 0; i < clients.length ;  i++) {
      clients[i].offer.remove(offer);
      promises.push(clients[i].save());
    }
    // tslint:disable-next-line:no-increment-decrement
    for (let i = 0; i < bornes.length; i++) {
      bornes[i].offers.remove(offer);
      promises.push(bornes[i].save());
    }
    return Promise.all(promises);
  }

  /**
   * Update offer by Id
   * @param createOfferDto
   * @param id
   */
  @ApiOperation({ title: 'Update offer by Id' })
  @ApiResponse({ status: 201, description: 'The offer has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':id')
  async update(@Body() createOfferDto: UpdateOfferDto, @Param('id') id): Promise<Offer> {
    return this.offersService.update(id, createOfferDto);
  }

}
