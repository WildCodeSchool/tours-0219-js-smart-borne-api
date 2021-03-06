import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Offer } from '../interfaces/offers.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOfferDto } from '../../offers/DTO/create-offer.dto';
import { ObjectId } from 'mongodb';
import {UpdateOfferDto} from "../../offers/DTO/update-offer.dto";

@Injectable()
export class OffersService {

  /**
   * @param offerModel
   */
  constructor(
    @InjectModel('Offers') private readonly offerModel: Model<Offer>,
  ) { }

  async findAll(): Promise<Offer[]> {
    return await this.offerModel.find();
  }

  /**
   * @param id
   */
  async findOne(id: string): Promise<Offer> {
    const offer = await this.offerModel.findOne({ _id: new ObjectId(id) });
    if (!offer) {
      throw new HttpException("Doesn't exist", HttpStatus.NOT_FOUND);
    }
    return offer;
  }

  /**
   * @param id
   * @param offerData
   */
  async create(id: string, offerData: CreateOfferDto): Promise<Offer> {
    const newOffer = new this.offerModel(offerData);
    const result = await this.offerModel.find({ pseudo: newOffer.pseudo });
    if (result.length) {
      throw new HttpException('Not found', HttpStatus.BAD_REQUEST);
    } else {
      return await newOffer.save();
    }
  }

  /**
   * @param id
   */
  async delete(id: string): Promise<Offer> {
    const offer =  await this.offerModel.findByIdAndRemove({ _id: new ObjectId(id) });
    if (!offer) {
      throw new HttpException("Doesn't exist", HttpStatus.NOT_FOUND);
    }
    return offer;
  }

  /**
   * @param id
   * @param offerData
   */
  async update(id: string, offerData: UpdateOfferDto): Promise<Offer> {
    const offerUpdate = await this.offerModel.findByIdAndUpdate(id, offerData, { new: true });
    if (!offerData) {
      throw new HttpException("Doesn't exist", HttpStatus.NOT_FOUND);
    }
    return offerUpdate;
  }

}
