import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Problem } from '../../problems/entities/problem.entity';
import { Symptom } from '../../symptoms/entities/symptom.entity';
import { Rule } from '../../rules/entities/rule.entity';

@Entity({ name: 'blackboards' })
export class Blackboard {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Problem)
  @JoinColumn({ name: 'problem_id', referencedColumnName: 'id' })
  problem: Problem;

  @OneToOne(() => Symptom)
  @JoinColumn({ name: 'symptom_id', referencedColumnName: 'id' })
  symptom: Symptom;

  @OneToOne(() => Rule)
  @JoinColumn({ name: 'rule_id', referencedColumnName: 'id' })
  rule: Rule;
}
