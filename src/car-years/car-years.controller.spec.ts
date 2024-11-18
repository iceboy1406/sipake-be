import { Test, TestingModule } from '@nestjs/testing';
import { CarYearsController } from './car-years.controller';
import { CarYearsService } from './car-years.service';

describe('CarYearsController', () => {
  let controller: CarYearsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarYearsController],
      providers: [CarYearsService],
    }).compile();

    controller = module.get<CarYearsController>(CarYearsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
