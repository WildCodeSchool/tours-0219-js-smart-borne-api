import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Offer } from "./interfaces/offers.interface";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class OffersService {
  constructor(
    @InjectModel("Offer") private readonly offerModel: Model<Offer>
  ) { }

  async findAll(): Promise<Offer[]> {
    return await this.offerModel.find();
  }

  async findOne(id: string): Promise<Offer> {
    const offer = await this.offerModel.findOne({ _id: id });
    if (!offer) {
      throw new HttpException("Doesn't exist", HttpStatus.NOT_FOUND);
    }
    return offer;
  }

  async create(offer: Offer): Promise<Offer> {
    const newOffer = new this.offerModel(offer);
    return await newOffer.save();
  }

  async delete(id: string): Promise<Offer> {
    const offer =  await this.offerModel.findByIdAndRemove(id);
    if (!offer) {
      throw new HttpException("Doesn't exist", HttpStatus.NOT_FOUND);
    }
    return offer;
  }

  async update(id: string, offer: Offer): Promise<Offer> {
    const offerUpdate = await this.offerModel.findByIdAndUpdate(id, offer, { new: true });
    if (!offer) {
      throw new HttpException("Doesn't exist", HttpStatus.NOT_FOUND);
    }
    return offerUpdate;
  }
}
