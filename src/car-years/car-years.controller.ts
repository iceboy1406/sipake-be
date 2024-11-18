import { Controller, Get, Param } from '@nestjs/common';
import { CarYearsService } from './car-years.service';
import { ResponseMessage } from '../common/decorators/response-message.decorator';

@Controller('car-years')
export class CarYearsController {
  constructor(private readonly carYearsService: CarYearsService) {}

  @Get()
  @ResponseMessage('Berhasil mendapatkan semua tahun mobil')
  findAll() {
    return this.carYearsService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Berhasil mendapatkan tahun mobil berdasarkan ID')
  findOne(@Param('id') id: string) {
    return this.carYearsService.findOne(+id);
  }
}
