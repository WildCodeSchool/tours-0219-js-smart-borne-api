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
@UseGuards(AuthGuard('jwt'))
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
  @Get()
  async findAll(): Promise<Offer[]> {
    return this.offersService.findAll();
  }

  /**
   * Create offer
   * @param id
   * @param createOfferDto
   */
  @Post()
  async create(@Param('id') id: string, @Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offersService.create(id, createOfferDto);
  }

  /**
   * Offer by Id
   * @param id
   */
  @Get(':id')
  async findOne(@Param('id') id): Promise<Offer> {
    return this.offersService.findOne(id);
  }

  /**
   * @param idOffer
   */
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
  @Put(':id')
  async update(@Body() createOfferDto: CreateOfferDto, @Param('id') id): Promise<Offer> {
    return this.offersService.update(id, createOfferDto);
  }
}
