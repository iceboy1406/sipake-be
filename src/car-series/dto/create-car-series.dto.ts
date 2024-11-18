import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCarSeriesDto {
  @IsNotEmpty()
  @MaxLength(4)
  series_id: string;
}
