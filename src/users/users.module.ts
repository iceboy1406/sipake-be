import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { CarSeriesModule } from '../car-series/car-series.module';
import { CarYearsModule } from '../car-years/car-years.module';
import { EngineCodesModule } from '../engine-codes/engine-codes.module';
import { VerificationCode } from './entities/verification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, VerificationCode]),
    CarSeriesModule,
    CarYearsModule,
    EngineCodesModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './public/images/photo-profiles',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
