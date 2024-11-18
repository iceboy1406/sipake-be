import { Test, TestingModule } from '@nestjs/testing';
import { SolutionsController } from './solutions.controller';
import { SolutionsService } from './solutions.service';

describe('SolutionsController', () => {
  let controller: SolutionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolutionsController],
      providers: [SolutionsService],
    }).compile();

    controller = module.get<SolutionsController>(SolutionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
