import { Column, Entity } from 'typeorm';

@Entity({ name: 'solutions' })
export class Solution {
  @Column({ type: 'varchar', primary: true, length: 4 })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;
}
