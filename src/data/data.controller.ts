import { Controller, Get, Param } from '@nestjs/common';
import { DataService } from '../shared/services/data.service';
import { Data } from '../shared/interfaces/data.interface';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';

@Controller('datas')
@ApiUseTags('data')
export class DataController {

  /**
   * @param dataService
   */
  constructor(private readonly dataService: DataService) { }

  /**
   * Data by days
   */
  @ApiOperation({ title: 'Get data by days' })
  @ApiResponse({ status: 200, description: 'Return data by days.' })
  @Get('days')
  findAllDays(): Promise<Data[]> {
    return this.dataService.findAllDays();
  }

  /**
   * Data by weeks
   */
  @ApiOperation({ title: 'Get data by weeks' })
  @ApiResponse({ status: 200, description: 'Return data by weeks.' })
  @Get('weeks')
  findAllWeeks(): Promise<Data[]> {
    return this.dataService.findAllWeeks();
  }

  /**
   * Data by month
   */
  @ApiOperation({ title: 'Get data by month' })
  @ApiResponse({ status: 200, description: 'Return data by month.' })
  @Get('months')
  findAllMonths(): Promise<Data[]> {
    return this.dataService.findAllMonths();
  }

  /**
   * Data by Id at days
   * @param id
   */
  @ApiOperation({ title: 'Get data by Id at days' })
  @ApiResponse({ status: 200, description: 'Return data by Id by days.' })
  @Get(':id/days')
  findDays(@Param('id') id): Promise<Data[]> {
    return this.dataService.findDays(id);
  }

  /**
   * Data by Id at week
   * @param id
   */
  @ApiOperation({ title: 'Get data by Id at days' })
  @ApiResponse({ status: 200, description: 'Return data by Id at week.' })
  @Get(':id/weeks')
  findWeeks(@Param('id') id): Promise<Data[]> {
    return this.dataService.findWeeks(id);
  }

  /**
   * Data by Id at months
   * @param id
   */
  @ApiOperation({ title: 'Get data by Id at month' })
  @ApiResponse({ status: 200, description: 'Return data by Id at mont.' })
  @Get(':id/months')
  findMonths(@Param('id') id): Promise<Data[]> {
    return this.dataService.findMonths(id);
  }
}
