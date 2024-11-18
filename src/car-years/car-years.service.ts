import { Injectable } from '@nestjs/common';
import { CarYear } from './entities/car-year.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CarYearsService {
  constructor(
    @InjectRepository(CarYear) private carYearModel: Repository<CarYear>,
  ) {}

  findAll() {
    return this.carYearModel.find();
  }

  findOne(id: number) {
    return this.carYearModel.findOneBy({ year: id });
  }
}
