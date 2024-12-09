import { Controller, Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { ConsultationsService } from './consultations.service';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { ConsultationProcessDto } from './dto/consultation-process.dto';

@Controller('consultations')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Post('start')
  @ResponseMessage('Konsultasi dimulai')
  @UseGuards(AuthGuard)
  startConsultation(@Request() req: { username: string }) {
    return this.consultationsService.startConsultation(req.username);
  }

  @Post('process')
  @ResponseMessage('Proses Konsultasi Berhasil')
  @UseGuards(AuthGuard)
  processConsultation(
    @Request() req: { username: string },
    @Body() consultationProcessDto: ConsultationProcessDto,
  ) {
    return this.consultationsService.processConsultation(
      req.username,
      consultationProcessDto,
    );
  }

  @Get('histories')
  @ResponseMessage('Berhasil mendapatkan riwayat konsultasi')
  @UseGuards(AuthGuard)
  getConsultationHistories(
    @Request() req: { username: string },
  ) {
    return this.consultationsService.getConsultationHistories(
      req.username,
    );
  }
}
