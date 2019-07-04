import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Borne } from '../interfaces/borne.interface';
import { CreateBorneDto } from '../../borne/dto/create-borne.dto';
import { UpdateBorneDto } from '../../borne/dto/update-borne.dto';

@Injectable()
export class BorneService {

  /**
   * @param borneModel
   */
  constructor(
    @InjectModel('Bornes') private readonly borneModel: Model<Borne>,
  ) {
  }

  async findAll(): Promise<Borne[]> {
    return await this.borneModel.find();
  }

  /**
   * @param id
   */
  async findOne(id: string): Promise<Borne> {
    const borne = await this.borneModel.findOne({ _id: new ObjectId(id) });
    if (!borne) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return borne;
  }

  /**
   * @param id
   * @param borneData
   */
  async create(id: string, borneData: CreateBorneDto): Promise<Borne> {
    const bornes = new (this.borneModel)(borneData);
    const result = await this.borneModel.find({ numeroSerie: bornes.numeroSerie });
    if (result.length) {
      throw new HttpException('Not found', HttpStatus.BAD_REQUEST);
    } else {
      return await bornes.save();
    }
  }

  /**
   * @param id
   * @param borneData
   */
  async update(id: string, borneData: UpdateBorneDto): Promise<Borne> {
    const borne = await this.borneModel.findByIdAndUpdate(id, borneData);
    if (!borne) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return borne;
  }

  /**
   * @param id
   */
  async delete(id: string): Promise<Borne> {
    const borne = await this.borneModel.findByIdAndRemove({ _id: new ObjectId(id) });
    if (!borne) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return borne;
  }

}
