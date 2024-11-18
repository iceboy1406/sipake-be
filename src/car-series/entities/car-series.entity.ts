import { Column, Entity } from 'typeorm';

@Entity({ name: 'car_series' })
export class CarSeries {
  @Column({ type: 'varchar', length: 4, primary: true })
  series_id: string;
}
