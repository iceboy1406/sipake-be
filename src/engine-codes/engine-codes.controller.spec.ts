import { Test, TestingModule } from '@nestjs/testing';
import { EngineCodesController } from './engine-codes.controller';
import { EngineCodesService } from './engine-codes.service';

describe('EngineCodesController', () => {
  let controller: EngineCodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EngineCodesController],
      providers: [EngineCodesService],
    }).compile();

    controller = module.get<EngineCodesController>(EngineCodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
