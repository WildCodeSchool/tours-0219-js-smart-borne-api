import {Get, Post, Body, Put, Delete, Param, Controller} from '@nestjs/common';
import {BorneService} from "./borne.service";
import {CreateBorneDto} from "./dto/create-borne.dto";
import {UpdateBorneDto} from "./dto/update-borne.dto";

@Controller('bornes')
export class BorneController {

  constructor(private readonly borneService: BorneService) {
  }

  @Get()
  async findAll(): Promise<any> {
    return await this.borneService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return await this.borneService.findOne(id);
  }

  @Post()
  async create(@Body() borneData: CreateBorneDto) {
    return this.borneService.create(borneData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() borneData: UpdateBorneDto) {
    return this.borneService.update(id, borneData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.borneService.delete(id);
  }

}
