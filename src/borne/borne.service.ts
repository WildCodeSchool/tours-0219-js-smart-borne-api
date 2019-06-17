import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Borne } from './interfaces/borne.interface';
import { CreateBorneDto } from './dto/create-borne.dto';
import { UpdateBorneDto } from './dto/update-borne.dto';

@Injectable()
export class BorneService {
  constructor(
    @InjectModel('bornes') private readonly borneModel: Model<Borne>,
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

  async create(borneData: CreateBorneDto): Promise<Borne> {
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

}
