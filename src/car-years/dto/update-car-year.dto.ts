import { PartialType } from '@nestjs/mapped-types';
import { CreateCarYearDto } from './create-car-year.dto';

export class UpdateCarYearDto extends PartialType(CreateCarYearDto) {}
