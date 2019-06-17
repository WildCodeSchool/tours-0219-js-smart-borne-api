import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Client } from './client.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateClientDto } from './client.dto.create';
import { UpdateClientDto } from './client.dto.update';
import { ObjectId } from 'mongodb';
@Injectable()
export class ClientService {
  constructor(@InjectModel('Client') private readonly clientModel: Model<Client>) { }

  async findAll(): Promise<Client[]> {
    return await this.clientModel.find();
  }
  async findOne(id: string): Promise<Client> {
    const client = await this.clientModel.findOne({ _id: new ObjectId(id) });
    if (!client) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return client;
  }
  async create(client: CreateClientDto): Promise<Client> {
    const newClient = new this.clientModel(client);
    return await newClient.save();
  }
  async delete(id: string): Promise<Client> {
    const client = await this.clientModel.findByIdAndRemove(id);
    if (!client) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return client;
  }
  async update(id: string, updateclient: UpdateClientDto): Promise<Client> {
    const client = await this.clientModel.findByIdAndUpdate(id, updateclient, { new: true });
    if (!client) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return client;
  }
}
