import { Module } from '@nestjs/common';
import { CarSeriesService } from './car-series.service';
import { CarSeriesController } from './car-series.controller';
import { CarSeries } from './entities/car-series.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CarSeries])],
  controllers: [CarSeriesController],
  providers: [CarSeriesService],
})
export class CarSeriesModule {}
