import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Data } from '../interfaces/data.interface';

@Injectable()
export class DataService {
  constructor(
    @InjectModel('Datas') private readonly dataModel: Model<Data>,
  ) {
  }

  async findAllDays(): Promise<Data[]> {
    return await this.dataModel.find({ type: 'daily' });
  }

  async findAllWeeks(): Promise<Data[]> {
    return await this.dataModel.find({ type: 'weekly' });
  }

  async findAllMonths(): Promise<Data[]> {
    return await this.dataModel.find({ type: 'monthly' });
  }

  async findDays(borneId): Promise<Data[]> {
    // tslint:disable-next-line: max-line-length
    return await this.dataModel.find({ borne: new Types.ObjectId(borneId), type: 'daily' }).limit(7);
  }

  async findWeeks(borneId): Promise<Data[]> {
    // tslint:disable-next-line: max-line-length
    return await this.dataModel.find({ borne: new Types.ObjectId(borneId), type: 'weekly' }).limit(4);
  }

  async findMonths(borneId): Promise<Data[]> {
    // tslint:disable-next-line: max-line-length
    return await this.dataModel.find({ borne: new Types.ObjectId(borneId), type: 'monthly' }).limit(12);
  }
}
