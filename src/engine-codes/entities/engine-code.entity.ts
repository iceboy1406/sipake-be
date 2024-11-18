import { Column, Entity } from 'typeorm';

@Entity({ name: 'engine_codes' })
export class EngineCode {
  @Column({ type: 'varchar', length: 6, primary: true })
  code: string;
}
