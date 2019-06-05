import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param
} from "@nestjs/common";
import { CreateOfferDto } from "./DTO/create-offer.dto";
import { Offer } from "./interfaces/offers.interface";
import { OffersService } from "./offers.service";

@Controller("offers")
export class OffersController {
  constructor(private readonly offersService: OffersService) { }

  @Get()
  async findAll(): Promise<Offer[]> {
    return this.offersService.findAll();
  }

  @Post()
  create(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offersService.create(createOfferDto);
  }

  @Get(":id")
  findOne(@Param("id") id): Promise<Offer> {
    return this.offersService.findOne(id);
  }

  @Delete(":id")
  delete(@Param("id") id): Promise<Offer> {
    return this.offersService.delete(id);
  }

  @Put(":id")
  update(@Body() updateOfferDto: CreateOfferDto, @Param("id") id): Promise<Offer> {
    return this.offersService.update(id, updateOfferDto)
  }
}
