import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CarSeriesService } from './car-series.service';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { CreateCarSeriesDto } from './dto/create-car-series.dto';

@Controller('car-series')
export class CarSeriesController {
  constructor(private readonly carSeriesService: CarSeriesService) {}

  @Get()
  @ResponseMessage('Berhasil mendapatkan semua seri mobil')
  findAll() {
    return this.carSeriesService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Berhasil mendapatkan seri mobil berdasarkan ID')
  findOne(@Param('id') id: string) {
    return this.carSeriesService.findOne(id);
  }

  @Post()
  @ResponseMessage('Berhasil menambahkan seri mobil')
  create(@Body() createCarSeriesDto: CreateCarSeriesDto) {
    return this.carSeriesService.create(createCarSeriesDto);
  }
}
