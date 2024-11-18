import { Controller, Get, Param } from '@nestjs/common';
import { EngineCodesService } from './engine-codes.service';
import { ResponseMessage } from '../common/decorators/response-message.decorator';

@Controller('engine-codes')
export class EngineCodesController {
  constructor(private readonly engineCodesService: EngineCodesService) {}

  @Get()
  @ResponseMessage('Berhasil mendapatkan semua kode mesin')
  findAll() {
    return this.engineCodesService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Berhasil mendapatkan kode mesin berdasarkan ID')
  findOne(@Param('id') id: string) {
    return this.engineCodesService.findOne(id);
  }
}
