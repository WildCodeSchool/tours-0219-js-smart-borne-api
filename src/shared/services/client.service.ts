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

  /**
   * @param clientModel
   * @param borneModel
   * @param offerModel
   */
  constructor(
    @InjectModel('Clients') private readonly clientModel: Model<Client>,
    @InjectModel('Bornes') private readonly borneModel: Model<Borne>,
    @InjectModel('Offers') private readonly offerModel: Model<Offer>,
  ) { }

  async findAll(): Promise<Client[]> {
    return await this.clientModel.find();
  }

  /**
   * @param id
   */
  async findOne(id: string): Promise<Client> {
    const client = await this.clientModel.findOne({ _id: new ObjectId(id) });
    if (!client) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return client;
  }

  async addBorne(idClient: string, borne: Borne): Promise<Client> {
    const client = await this.findOne(idClient);
    if (!client) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    client.bornes.push(borne);
    await client.save();
    return client;
  }

  async addOffer(idClient: string, offer: Offer): Promise<Client> {
    const client = await this.findOne(idClient);
    if (!client) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    client.offer.push(offer);
    await client.save();
    return client;
  }

  async hasBorne(idBorne: string, idClient: string): Promise<Boolean> {
    const client: Client = await this.findOne(idClient);
    if (client.bornes.id(idBorne)) {
      return true;
    }
    return false;
  }

  async hasOffer(idOffer: string, idClient: string): Promise<Boolean> {
    const client: Client = await this.findOne(idClient);
    if (client.offer.id(idOffer)) {
      return true;
    }
    return false;
  }

  /**
   * @param client
   */
  async create(client: CreateClientDto): Promise<Client> {
    const newClient = new this.clientModel(client);
    const result = await this.clientModel.find({ siret: newClient.siret });
    if (result.length) {
      throw new HttpException('Not found', HttpStatus.BAD_REQUEST);
    } else {
      return await newClient.save();
    }
  }

  /**
   * @param id
   */
  async delete(id: string): Promise<Client> {
    const client = await this.clientModel.findByIdAndRemove(id);
    if (!client) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return client;
  }

  /**
   * @param id
   * @param updateclient
   */
  async update(id: string, updateclient: UpdateClientDto): Promise<Client> {
    const client = await this.clientModel.findByIdAndUpdate(id, updateclient, { new: true });
    if (!client) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return client;
  }

  /**
   * @param idClient
   * @param idBorne
   */
  async deleteBorne(idClient: string, idBorne: string): Promise<Client> {
    const client: Client = await this.clientModel.findById(idClient);
    const borne: Borne = await this.borneModel.findById(idBorne);
    if (!borne && !client) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    client.bornes.remove(borne);
    await client.save();
    return client;
  }

  /**
   * @param idClient
   * @param idOffer
   */
  async deleteOffer(idClient: string, idOffer: string): Promise<Client> {
    const client: Client = await this.clientModel.findById(idClient);
    const offer: Offer = await this.offerModel.findById(idOffer);
    if (!client && !offer) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    client.offer.remove(offer);
    await client.save();
    return client;
  }

  /**
   * @param idBorne
   */
  async findClientByBorne(idBorne: string): Promise<Client[]> {
    const clients: Client[] = await this.clientModel.find({ 'bornes._id': idBorne });
    if (!clients) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return clients;
  }

  /**
   * 
   * @param idBorne 
   */
  async removeBornes(idBorne: string, borne: Borne): Promise<Client[]> {
    const clients = await this.findClientByBorne(idBorne);

    const promises = [];

    // tslint:disable-next-line:no-increment-decrement
    for (let i = 0; i < clients.length; i++) {
      clients[i].bornes.remove(borne);
      promises.push(clients[i].save());
    }

    return Promise.all(promises);
  }


  /**
   * @param idOffer
   */
  async findClientByOffer(idOffer: string): Promise<Client[]> {
    const clients: Client[] = await this.clientModel.find({ 'offer._id': idOffer });
    if (!clients) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return clients;
  }

  /**
   * @param query
   */
  async queryClient(query: string): Promise<Client[]> {
    if (query && query.trim().length > 0) {
      return this.clientModel.find({ name: { $regex: `.*${query}.*` } });
    }
    return this.clientModel.find();
  }
}
