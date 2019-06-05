import { Injectable } from "@nestjs/common";
import { Offer } from "./interfaces/offers.interface";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class OffersService {
  constructor(
    @InjectModel("Offer") private readonly offerModel: Model<Offer>
  ) {}

  async findAll(): Promise<Offer[]> {
    return await this.offerModel.find();
  }

  async findOne(id: string): Promise<Offer> {
    return await this.offerModel.findOne({ _id: id });
  }

  async create(offer: Offer): Promise<Offer> {
    const newOffer = new this.offerModel(offer);
    return await newOffer.save();
  }

  async delete(id: string): Promise<Offer> {
    return await this.offerModel.findByIdAndRemove(id);
  }

  async update(id: string, offer: Offer): Promise<Offer> {
    return await this.offerModel.findByIdAndUpdate(id, offer, { new: true });
  }
}
