import { Module } from '@nestjs/common';
import { EngineCodesService } from './engine-codes.service';
import { EngineCodesController } from './engine-codes.controller';
import { EngineCode } from './entities/engine-code.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EngineCode])],
  controllers: [EngineCodesController],
  providers: [EngineCodesService],
})
export class EngineCodesModule {}
