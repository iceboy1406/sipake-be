import { Injectable } from '@nestjs/common';
import { EngineCode } from './entities/engine-code.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EngineCodesService {
  constructor(
    @InjectRepository(EngineCode) private engineCodeModel: Repository<EngineCode>,
  ) {}

  findAll() {
    return this.engineCodeModel.find();
  }

  findOne(id: string) {
    return this.engineCodeModel.findOneBy({ code: id });
  }
}
