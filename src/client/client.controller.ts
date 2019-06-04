import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateClientDto } from './client.dto.create';
import {UpdateClientDto} from './client.dto.update';
import { ClientService } from './client.service';
import { Client } from './client.interface';

@Controller('client')
export class ClientController {

    constructor(private readonly clientsService: ClientService){}
    @Get()
    async findAll(): Promise<Client[]>{
        return this.clientsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<Client>{
        return this.clientsService.findOne(id)
    }

    @Post()
    create(@Body() createClientDto: CreateClientDto): Promise<Client>{
        return this.clientsService.create(createClientDto);
    }
    @Delete(':id')
    delete(@Param('id') id): Promise<Client>{
        return this.clientsService.delete(id)
    }
    @Put(':id')
    update(@Body() updateClientDto: UpdateClientDto, @Param('id') id): Promise<Client>{
        return this.clientsService.update(id, updateClientDto)
    }

}
