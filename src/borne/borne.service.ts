import {Injectable, Param} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {ObjectId} from 'mongodb';
import {Borne} from "./interfaces/borne.interface";
import {CreateBorneDto} from "./dto/create-borne.dto";

@Injectable()
export class BorneService {
  constructor(
    @InjectModel('bornes') private readonly borneModel: Model<Borne>
  ) {
  }

  public async findAll(): Promise<Borne[]> {
    return await this.borneModel.find();
  }

  public async findOne(id): Promise<Borne> {
    return await this.borneModel.findOne({_id: new ObjectId(id)});
  }

  public async create(borneData: CreateBorneDto): Promise<Borne> {
    const cards = new (this.borneModel)(borneData);
    return await cards.save();
  }

  public async update(@Param('id') id: string, borneData: any): Promise<Borne> {
    return await this.borneModel.findByIdAndUpdate(id, borneData);
  }

  public async delete(id: string): Promise<Borne> {
    return await this.borneModel.findByIdAndRemove({id: id});
  }

}
