import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Borne } from '../interfaces/borne.interface';
import { CreateBorneDto } from '../../borne/dto/create-borne.dto';
import { UpdateBorneDto } from '../../borne/dto/update-borne.dto';
import { Offer } from '../interfaces/offers.interface';
import { Client } from '../interfaces/client.interface';
import { Types } from 'mongoose';

@Injectable()
export class BorneService {

  /**
   * @param borneModel
   * @param offerModel
   */
  constructor(
    @InjectModel('Bornes') private readonly borneModel: Model<Borne>,
    @InjectModel('Offers') private readonly offerModel: Model<Offer>,
    @InjectModel('Clients') private readonly clientModel: Model<Client>,
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
  *
  * @param idBorne
  * @param client
  */
  async addClient(idBorne: string, client: Client): Promise<Borne> {
    const borne: Borne = await this.findOne(idBorne);
    borne.client = client;
    await borne.save();
    return borne;
  }

  async hasClient(idBorne: string, idClient: string): Promise<Boolean> {
    const borne = await this.borneModel.findById(idBorne);
    if (borne.client && borne.client._id === idClient) {
      return true;
    }
    return false;
  }
  /**
  *
  * @param idBorne
  * @param offer
  */
  async addOffer(idBorne: string, offer: Offer): Promise<Borne> {
    const borne: Borne = await this.findOne(idBorne);
    if (!borne) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    borne.offers.push(offer);
    await borne.save();
    return borne;
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

  async deleteClient(idBorne: string, idClient: string): Promise<Borne> {
    const borne: Borne = await this.borneModel.findById(idBorne);
    // borne.client.remove();
    borne.set('client', null)
    await borne.save();
    return borne;
  }
  /**
   * @param idBorne
   * @param idOffer
   */
  async deleteOffer(idBorne: string, idOffer: string): Promise<Borne> {
    const borne: Borne = await this.borneModel.findById(idBorne);
    const offer: Offer = await this.offerModel.findById(idOffer);
    if (!borne && !offer) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    borne.offers.remove(offer);
    await borne.save();
    return borne;
  }

  /**
   * @param idOffer
   */
  async findBorneByOffer(idOffer: string): Promise<Borne[]> {
    const bornes: Borne[] = await this.borneModel.find({ 'offers._id': idOffer });
    if (!bornes) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return bornes;
  }
  async findBorneByClient(idClient: string): Promise<Borne[]> {
    const bornes: Borne[] = await this.borneModel.find({ 'client._id': Types.ObjectId(idClient) });
    return bornes;
  }
  /**
   * @param query
   */
  async queryBorne(query: string): Promise<Borne[]> {
    console.log(query);
    if (query && query.trim().length > 0) {
      return this.borneModel.find({ numeroSerie: { $regex: `.*${query}.*` } });
    }
    return this.borneModel.find();
  }
}
