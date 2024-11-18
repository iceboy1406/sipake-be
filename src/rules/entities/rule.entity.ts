import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { Symptom } from '../../symptoms/entities/symptom.entity';
import { Problem } from '../../problems/entities/problem.entity';

@Entity({ name: 'rules' })
export class Rule {
  @Column({ type: 'varchar', length: 4, primary: true })
  id: string;

  @OneToOne(() => Problem)
  @JoinColumn({ name: 'problem_id', referencedColumnName: 'id' })
  problem: Problem;

  @ManyToMany(() => Symptom, (symptom) => symptom.rules)
  @JoinTable()
  symptoms: Symptom[];
}
