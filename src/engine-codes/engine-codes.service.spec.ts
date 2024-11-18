import { Test, TestingModule } from '@nestjs/testing';
import { EngineCodesService } from './engine-codes.service';

describe('EngineCodesService', () => {
  let service: EngineCodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EngineCodesService],
    }).compile();

    service = module.get<EngineCodesService>(EngineCodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
