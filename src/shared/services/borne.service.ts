import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Borne } from '../interfaces/borne.interface';
import { CreateBorneDto } from '../../borne/dto/create-borne.dto';
import { UpdateBorneDto } from '../../borne/dto/update-borne.dto';
import { Offer } from '../interfaces/offers.interface';

@Injectable()
export class BorneService {
  constructor(
    @InjectModel('Bornes') private readonly borneModel: Model<Borne>,
    @InjectModel('Offers') private readonly offerModel: Model<Offer>,
  ) {
  }

  async findAll(): Promise<Borne[]> {
    return await this.borneModel.find();
  }

  async findOne(id: string): Promise<Borne> {
    const borne = await this.borneModel.findOne({ _id: new ObjectId(id) });
    if (!borne) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return borne;
  }

  async create(id: string, borneData: CreateBorneDto): Promise<Borne> {
    const bornes = new (this.borneModel)(borneData);
    return await bornes.save();
  }

  async update(id: string, borneData: UpdateBorneDto): Promise<Borne> {
    const borne = await this.borneModel.findByIdAndUpdate(id, borneData);
    if (!borne) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return borne;
  }

  async delete(id: string): Promise<Borne> {
    const borne = await this.borneModel.findByIdAndRemove({ _id: new ObjectId(id) });
    if (!borne) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return borne;
  }

  async deleteOffer(idBorne: string, idOffer: string): Promise<Borne> {
    const borne: Borne = await this.borneModel.findById(idBorne);
    const offer: Offer = await this.offerModel.findById(idOffer);
    borne.offers.remove(offer);
    await borne.save();
    return borne;
  }

  async findBorneByOffer(idOffer: string): Promise<Borne[]> {
    const bornes: Borne[] = await this.borneModel.find({'offers._id': idOffer});
    return bornes;
  }
}
