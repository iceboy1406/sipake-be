import { Test, TestingModule } from '@nestjs/testing';
import { CarSeriesService } from './car-series.service';

describe('CarSeriesService', () => {
  let service: CarSeriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarSeriesService],
    }).compile();

    service = module.get<CarSeriesService>(CarSeriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
