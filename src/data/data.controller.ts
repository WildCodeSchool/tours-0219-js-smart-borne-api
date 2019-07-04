import { Controller, Get, Param } from '@nestjs/common';
import { DataService } from '../shared/services/data.service';
import { Data } from '../shared/interfaces/data.interface';

@Controller('datas')
export class DataController {

  constructor(private readonly dataService: DataService) { }

  @Get('days')
  findAllDays(): Promise<Data[]> {
    return this.dataService.findAllDays();
  }

  @Get('weeks')
  findAllWeeks(): Promise<Data[]> {
    return this.dataService.findAllWeeks();
  }

  @Get('months')
  findAllMonths(): Promise<Data[]> {
    return this.dataService.findAllMonths();
  }

  @Get(':id/days')
  findDays(@Param('id') id): Promise<Data[]> {
    return this.dataService.findDays(id);
  }

  @Get(':id/weeks')
  findWeeks(@Param('id') id): Promise<Data[]> {
    return this.dataService.findWeeks(id);
  }

  @Get(':id/months')
  findMonths(@Param('id') id): Promise<Data[]> {
    return this.dataService.findMonths(id);
  }
}
