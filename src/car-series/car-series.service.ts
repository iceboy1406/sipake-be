import { Injectable } from '@nestjs/common';
import { CarSeries } from './entities/car-series.entity';
import { CreateCarSeriesDto } from './dto/create-car-series.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CarSeriesService {
  constructor(
    @InjectRepository(CarSeries)
    private carSeriesRepository: Repository<CarSeries>,
  ) {}

  findAll() {
    return this.carSeriesRepository.find();
  }

  findOne(id: string) {
    return this.carSeriesRepository.findOneBy({ series_id: id });
  }

  create(createCarSeriesDto: CreateCarSeriesDto) {
    return this.carSeriesRepository.save({
      ...createCarSeriesDto,
    });
  }
}
