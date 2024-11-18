import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { CarSeriesModule } from '../car-series/car-series.module';
import { CarYearsModule } from '../car-years/car-years.module';
import { EngineCodesModule } from '../engine-codes/engine-codes.module';
import { VerificationCode } from './entities/verification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, VerificationCode]),
    CarSeriesModule,
    CarYearsModule,
    EngineCodesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
