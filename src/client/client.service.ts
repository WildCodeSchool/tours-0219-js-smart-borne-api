import { Injectable } from '@nestjs/common';
import { Client } from './client.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'
import { CreateClientDto } from './client.dto.create';
import { UpdateClientDto } from './client.dto.update';
@Injectable()
export class ClientService {
    constructor(@InjectModel('Client') private readonly clientModel: Model<Client>){}

    async findAll(): Promise<Client[]> {
        return await this.clientModel.find();
    }
    async findOne(id: string): Promise<Client> {
        return await this.clientModel.findOne({_id: id})
    }
    async create(client: CreateClientDto): Promise<Client> {
        const newClient = new this.clientModel(client);
        return await newClient.save();
    }
    async delete(id: string): Promise<Client> {
        return await this.clientModel.findByIdAndRemove(id);
    }
    async update(id: string, client: UpdateClientDto): Promise<Client> {
        return await this.clientModel.findByIdAndUpdate(id, client, {new: true} )
    }
}
