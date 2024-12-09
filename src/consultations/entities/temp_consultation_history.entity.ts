import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Symptom } from '../../symptoms/entities/symptom.entity';

@Entity({ name: 'temp_consultation_histories' })
export class TempConsultationHistory {
  @Column({ primary: true, generated: 'increment' })
  id: number;

  @Column({ type: 'boolean', default: false })
  yes: boolean;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @ManyToOne(() => Symptom)
  @JoinColumn({ name: 'symptom_id', referencedColumnName: 'id' })
  symptom: Symptom;
}
