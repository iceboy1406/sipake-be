import { Problem } from 'src/problems/entities/problem.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'consultation_histories' })
export class ConsultationHistory {
  @Column({ primary: true, generated: 'increment' })
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @ManyToOne(() => Problem, { nullable: true })
  @JoinColumn({ name: 'problem_id', referencedColumnName: 'id' })
  problem: Problem | null;

  @CreateDateColumn()
  consultation_date: Date;

  @Column({ type: 'varchar', length: 255 })
  status: string;
}
