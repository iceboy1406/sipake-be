import { PartialType } from '@nestjs/mapped-types';
import { CreateCarSeriesDto } from './create-car-series.dto';

export class UpdateCarSeryDto extends PartialType(CreateCarSeriesDto) {}
