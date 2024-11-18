import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Solution } from '../../solutions/entities/solution.entity';

@Entity({ name: 'problems' })
export class Problem {
  @Column({ type: 'varchar', length: 4, primary: true })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  picture: string;

  @OneToOne(() => Solution)
  @JoinColumn({ name: 'solution_id', referencedColumnName: 'id' })
  solution: Solution;
}
