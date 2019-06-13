import { Get, Post, Body, Put, Delete, Param, Controller, UseGuards } from '@nestjs/common';
import { BorneService } from './borne.service';
import { CreateBorneDto } from './dto/create-borne.dto';
import { UpdateBorneDto } from './dto/update-borne.dto';
import { Borne } from './interfaces/borne.interface';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('bornes')
export class BorneController {

  constructor(private readonly borneService: BorneService) {
  }

  @Get()
  async findAll(): Promise<Borne[]> {
    return await this.borneService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Borne> {
    return await this.borneService.findOne(id);
  }

  @Post()
  async create(@Body() borneData: CreateBorneDto): Promise<Borne> {
    return this.borneService.create(borneData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() borneData: UpdateBorneDto): Promise<Borne> {
    return this.borneService.update(id, borneData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Borne> {
    return this.borneService.delete(id);
  }

}
