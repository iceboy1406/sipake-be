import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Rule } from '../../rules/entities/rule.entity';
import { User } from '../../users/entities/user.entity';
import { Symptom } from '../../symptoms/entities/symptom.entity';

@Entity({ name: 'blackboards' })
export class Blackboard {
  @Column({ primary: true, generated: 'increment' })
  id: number;

  @ManyToOne(() => Rule)
  @JoinColumn({ name: 'rule_id', referencedColumnName: 'id' })
  rule: Rule;

  @Column({ type: 'boolean', default: false })
  done: boolean;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @ManyToOne(() => Symptom)
  @JoinColumn({ name: 'symptom_id', referencedColumnName: 'id' })
  symptom: Symptom;
}
