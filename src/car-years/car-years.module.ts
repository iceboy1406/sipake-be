import { Module } from '@nestjs/common';
import { CarYearsService } from './car-years.service';
import { CarYearsController } from './car-years.controller';
import { CarYear } from './entities/car-year.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CarYear])],
  controllers: [CarYearsController],
  providers: [CarYearsService],
})
export class CarYearsModule {}
