import { Column, Entity } from 'typeorm';

@Entity({ name: 'car_years' })
export class CarYear {
  @Column({ type: 'integer', primary: true })
  year: number;
}
