import { Column, Entity, ManyToMany } from 'typeorm';
import { Rule } from '../../rules/entities/rule.entity';

@Entity({ name: 'symptoms' })
export class Symptom {
  @Column({ type: 'varchar', length: 4, primary: true })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  picture: string;

  @ManyToMany(() => Rule, (rule) => rule.symptoms)
  rules: Rule[];
}
