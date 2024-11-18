import { PartialType } from '@nestjs/mapped-types';
import { CreateEngineCodeDto } from './create-engine-code.dto';

export class UpdateEngineCodeDto extends PartialType(CreateEngineCodeDto) {}
