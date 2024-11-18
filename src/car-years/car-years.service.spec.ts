import { Test, TestingModule } from '@nestjs/testing';
import { CarYearsService } from './car-years.service';

describe('CarYearsService', () => {
  let service: CarYearsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarYearsService],
    }).compile();

    service = module.get<CarYearsService>(CarYearsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
