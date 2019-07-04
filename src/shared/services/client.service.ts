import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Client } from '../interfaces/client.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateClientDto } from '../../client/client.dto.create';
import { UpdateClientDto } from '../../client/client.dto.update';
import { ObjectId } from 'mongodb';
import { Borne } from '../interfaces/borne.interface';

@Injectable()
export class ClientService {

  /**
   * @param clientModel
   * @param borneModel
   */
  constructor(
    @InjectModel('Clients') private readonly clientModel: Model<Client>,
    @InjectModel('Bornes') private readonly borneModel: Model<Borne>,
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
    client.bornes.remove(borne);
    await client.save();
    return client;
  }

  /**
   * @param idBorne
   */
  async findClientByBorne(idBorne: string): Promise<Client[]> {
    // const borne: Borne = await this.borneModel.findById(idBorne);
    const clients : Client[] = await this.clientModel.find({ 'bornes._id': idBorne });
    return clients;
  }
}
