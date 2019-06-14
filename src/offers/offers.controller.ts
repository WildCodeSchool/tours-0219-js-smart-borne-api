import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateOfferDto } from './DTO/create-offer.dto';
import { Offer } from './interfaces/offers.interface';
import { OffersService } from './offers.service';

@Controller('offres')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  async findAll(): Promise<Offer[]> {
    return this.offersService.findAll();
  }

  @Post()
  async create(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offersService.create(createOfferDto);
  }

  @Get(':id')
  async findOne(@Param('id') id): Promise<Offer> {
    return this.offersService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<Offer> {
    return this.offersService.delete(id);
  }

  @Put(':id')
  async update(@Body() createOfferDto: CreateOfferDto, @Param('id') id): Promise<Offer> {
    return this.offersService.update(id, createOfferDto);
  }
}
