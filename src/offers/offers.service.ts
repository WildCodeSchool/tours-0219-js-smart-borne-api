import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Offer } from './interfaces/offers.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOfferDto } from './DTO/create-offer.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class OffersService {
  constructor(
    @InjectModel('Offer') private readonly offerModel: Model<Offer>,
  ) { }

  async findAll(): Promise<Offer[]> {
    return await this.offerModel.find();
  }

  async findOne(id: string): Promise<Offer> {
    const offer = await this.offerModel.findOne({ _id: new ObjectId(id) });
    if (!offer) {
      throw new HttpException("Doesn't exist", HttpStatus.NOT_FOUND);
    }
    return offer;
  }

  async create(offerData: CreateOfferDto): Promise<Offer> {
    const newOffer = new this.offerModel(offerData);
    return await newOffer.save();
  }

  async delete(id: string): Promise<Offer> {
    const offer =  await this.offerModel.findByIdAndRemove(id);
    if (!offer) {
      throw new HttpException("Doesn't exist", HttpStatus.NOT_FOUND);
    }
    return offer;
  }

  async update(id: string, offerData: CreateOfferDto): Promise<Offer> {
    const offerUpdate = await this.offerModel.findByIdAndUpdate(id, offerData, { new: true });
    if (!offerData) {
      throw new HttpException("Doesn't exist", HttpStatus.NOT_FOUND);
    }
    return offerUpdate;
  }
}
