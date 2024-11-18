import { Module } from '@nestjs/common';
import { RulesService } from './rules.service';
import { RulesController } from './rules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from '../problems/entities/problem.entity';
import { Symptom } from '../symptoms/entities/symptom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Problem, Symptom])],
  controllers: [RulesController],
  providers: [RulesService],
})
export class RulesModule {}
