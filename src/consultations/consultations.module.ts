import { Module } from '@nestjs/common';
import { ConsultationsService } from './consultations.service';
import { ConsultationsController } from './consultations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blackboard } from './entities/blackboard.entity';
import { Problem } from '../problems/entities/problem.entity';
import { User } from '../users/entities/user.entity';
import { Solution } from '../solutions/entities/solution.entity';
import { Rule } from '../rules/entities/rule.entity';
import { RulesModule } from '../rules/rules.module';
import { TempConsultationHistory } from './entities/temp_consultation_history.entity';
import { ConsultationHistory } from './entities/consultation_history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Blackboard,
      User,
      Problem,
      Solution,
      Rule,
      TempConsultationHistory,
      ConsultationHistory
    ]),
    RulesModule,
  ],
  controllers: [ConsultationsController],
  providers: [ConsultationsService],
})
export class ConsultationsModule {}
