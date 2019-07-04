import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Client } from '../interfaces/client.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateClientDto } from '../../client/client.dto.create';
import { UpdateClientDto } from '../../client/client.dto.update';
import { ObjectId } from 'mongodb';
import { Borne } from '../interfaces/borne.interface';
import { Offer } from '../interfaces/offers.interface';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel('Clients') private readonly clientModel: Model<Client>,
    @InjectModel('Bornes') private readonly borneModel: Model<Borne>,
    @InjectModel('Offers') private readonly offerModel: Model<Offer>,
  ) { }

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
  async deleteBorne(idClient: string, idBorne: string): Promise<Client> {
    const client: Client = await this.clientModel.findById(idClient);
    const borne: Borne = await this.borneModel.findById(idBorne);
    client.bornes.remove(borne);
    await client.save();
    return client;
  }
  async deleteOffer(idClient: string, idOffer: string): Promise<Client> {
    const client: Client = await this.clientModel.findById(idClient);
    const offer: Offer = await this.offerModel.findById(idOffer);
    client.offer.remove(offer);
    await client.save();
    return client;
  }
  
  async findClientByBorne(idBorne: string): Promise<Client[]> {
    // const borne: Borne = await this.borneModel.findById(idBorne);
    const clients : Client[] = await this.clientModel.find({'bornes._id': idBorne });
    return clients;
  }
  async findClientByOffer(idOffer: string): Promise<Client[]> {
    const clients: Client[] = await this.clientModel.find({'offer._id': idOffer});
    return clients;
  }
}
