import { Test, TestingModule } from '@nestjs/testing';
import { CarSeriesController } from './car-series.controller';
import { CarSeriesService } from './car-series.service';

describe('CarSeriesController', () => {
  let controller: CarSeriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarSeriesController],
      providers: [CarSeriesService],
    }).compile();

    controller = module.get<CarSeriesController>(CarSeriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
