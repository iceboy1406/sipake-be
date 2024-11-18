import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Blackboard } from './entities/blackboard.entity';
import { DataSource, Repository } from 'typeorm';
import { Rule } from '../rules/entities/rule.entity';
import { ConsultationProcessDto } from './dto/consultation-process.dto';
import { TempConsultationHistory } from './entities/temp_consultation_history.entity';

@Injectable()
export class ConsultationsService {
  constructor(
    @InjectRepository(Blackboard)
    private blackboardRepository: Repository<Blackboard>,
    @InjectRepository(Rule)
    private rulesRepository: Repository<Rule>,
    @InjectRepository(TempConsultationHistory)
    private tempConsultationHistoryRepository: Repository<TempConsultationHistory>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async startConsultation(username: string) {
    await this.deleteLastConsultationData(username);

    // Get all rules
    const rules = await this.rulesRepository.find({
      order: { id: 'ASC' },
      relations: ['symptoms'],
    });

    // Create a blackboard for each symptom of each rule
    let blackboardId = 1;
    for (const rule of rules) {
      for (const symptom of rule.symptoms) {
        await this.blackboardRepository.save({
          id: blackboardId,
          rule,
          user: { username },
          symptom,
        });

        blackboardId++;
      }
    }

    // Return the first symptom as initial state
    const firstBlackboard = await this.blackboardRepository.findOne({
      where: { id: 1 },
      relations: ['symptom'],
    });

    return firstBlackboard.symptom;
  }

  async processConsultation(
    username: string,
    consultationProcessDto: ConsultationProcessDto,
  ) {
    // Save temp history
    await this.tempConsultationHistoryRepository.save({
      user: { username },
      yes: consultationProcessDto.yes,
      symptom: { id: consultationProcessDto.symptom_id },
    });

    // Update data with same symptom depends on consultationProcessDto.yes
    await this.blackboardRepository.update(
      {
        user: { username },
        symptom: { id: consultationProcessDto.symptom_id },
      },
      { done: true, yes: consultationProcessDto.yes },
    );

    // If consultationProcessDto.yes is true, then delete all the blackboards with rules that not contains same symptom
    // Otherwise delete all the blackboards that contains same symptom
    if (consultationProcessDto.yes) {
      await this.blackboardRepository
        .createQueryBuilder()
        .delete()
        .from(Blackboard)
        .where(
          `rule_id NOT IN (
        SELECT DISTINCT sub.rule_id
        FROM blackboards sub
        WHERE sub.symptom_id = :symptomId
      )`,
          { symptomId: consultationProcessDto.symptom_id },
        )
        .execute();
    } else {
      await this.blackboardRepository
        .createQueryBuilder()
        .delete()
        .from(Blackboard)
        .where(
          `rule_id IN (
        SELECT DISTINCT sub.rule_id
        FROM blackboards sub
        WHERE sub.symptom_id = :symptomId
      )`,
          { symptomId: consultationProcessDto.symptom_id },
        )
        .execute();
    }

    // Count remaining blackboard grouped by rule_id (with same rule_id, considered as one)
    const groupedBlackboards = await this.blackboardRepository
      .createQueryBuilder()
      .select('rule_id')
      .groupBy('rule_id')
      .getRawMany();

    // Continue to next symptoms
    if (groupedBlackboards.length > 1) {
      const nextBlackboard = await this.blackboardRepository.findOne({
        where: { user: { username }, done: false },
        order: { symptom: { id: 'ASC' }, rule: { id: 'ASC' } },
        relations: ['symptom', 'rule'],
      });

      return {
        status: 'Continue',
        data: nextBlackboard,
      };
    }

    // Finish consultation by remaining rule_id or check not done yet symptoms
    if (groupedBlackboards.length == 1) {
      const notDoneYet = await this.blackboardRepository.count({
        where: {
          user: { username },
          done: false,
        },
      });
      // Finish consultation
      if (notDoneYet == 0) {
        const finalBlackboard = await this.blackboardRepository.findOne({
          where: { user: { username } },
          relations: [
            'rule',
            'rule.problem',
            'rule.symptoms',
            'rule.problem.solution',
          ],
        });

        await this.deleteLastConsultationData(username);

        return {
          status: 'Result',
          data: finalBlackboard.rule,
        };
      } else {
        // Continue to next symptoms
        const nextBlackboard = await this.blackboardRepository.findOne({
          where: { user: { username }, done: false },
          order: { symptom: { id: 'ASC' }, rule: { id: 'ASC' } },
          relations: ['symptom', 'rule'],
        });

        return {
          status: 'Continue',
          data: nextBlackboard.symptom,
        };
      }
    }

    // Problem not found
    const allHistoryCount =
      await this.tempConsultationHistoryRepository.countBy({
        user: { username },
      });
    const noAnswerCount = await this.tempConsultationHistoryRepository.countBy({
      user: { username },
      yes: false,
    });

    if (allHistoryCount == noAnswerCount) {
      await this.deleteLastConsultationData(username);
      return {
        status: 'NeverHadAProblem',
        data: {},
      };
    } else {
      await this.deleteLastConsultationData(username);
      return {
        status: 'ProblemNotFound',
        data: {},
      };
    }
  }

  async saveHistory(username: string) {}

  async deleteLastConsultationData(username: string) {
    // Reset blackboard for current user
    await this.blackboardRepository.delete({ user: { username } });

    // Reset temp consultation histories for current user
    await this.tempConsultationHistoryRepository.delete({ user: { username } });
  }
}
