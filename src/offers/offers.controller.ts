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

@UseGuards(AuthGuard('jwt'))
@Controller('offer')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

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
   * Delete offer by Id
   * @param id
   */
  @Delete(':id')
  async delete(@Param('id') id): Promise<Offer> {
    return this.offersService.delete(id);
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
