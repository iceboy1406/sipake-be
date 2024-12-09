import { HttpException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { VerificationCode } from './entities/verification.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(VerificationCode)
    private verificationCodeRepository: Repository<VerificationCode>,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async register(
    registerDto: RegisterDto,
    profilePicture: Express.Multer.File,
  ) {
    if (await this.userRepository.findOneBy({ email: registerDto.email })) {
      throw new HttpException('Email sudah digunakan oleh akun lain', 400);
    }

    if (
      await this.userRepository.findOneBy({ username: registerDto.username })
    ) {
      throw new HttpException('Username sudah digunakan', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(registerDto.password, salt);

    const user = await this.userRepository.save({
      ...registerDto,
      password: hashedPassword,
      carSeries: { series_id: registerDto.car_series_id },
      carYear: { year: +registerDto.car_year },
      engineCode: { code: registerDto.engine_code },
      profilePicture: profilePicture.path,
    });

    await this.sendVerificationEmail({
      username: user.username,
      targetUser: user,
    });

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOneBy({
      username: loginDto.username,
    });

    if (!user) {
      throw new HttpException('User tidak ditemukan', 400);
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Password salah', 401);
    }

    if (!user.verified) {
      await this.sendVerificationEmail({
        username: user.username,
        targetUser: user,
      });
      throw new HttpException('Email belum diverifikasi', 401);
    }

    const token = this.jwtService.sign({ username: user.username });
    return {
      token,
      user,
    };
  }

  async sendVerificationEmail({
    username,
    targetUser,
  }: {
    username: string;
    targetUser?: User;
  }) {
    const user =
      targetUser ?? (await this.userRepository.findOneBy({ username }));

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1);
    const oldVerificationCode = await this.verificationCodeRepository.findOneBy(
      { user: { username } },
    );
    if (oldVerificationCode) {
      await this.verificationCodeRepository.update(
        { user: { username } },
        {
          code: verificationCode,
          expired_date: expirationDate,
        },
      );
    } else {
      await this.verificationCodeRepository.save({
        user,
        code: verificationCode,
        expired_date: expirationDate,
      });
    }
    
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Email Verification',
      template: './verification',
      context: {
        name: user.name,
        code: verificationCode,
      },
    });
    console.log('Email sent');
  }

  async verifyEmail(username: string, code: string) {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new HttpException('User tidak ditemukan', 400);
    }

    const verificationCode = await this.verificationCodeRepository.findOne({
      where: { user: { username }, code },
    });

    console.log({ user, username, code, verificationCode });

    if (!verificationCode || verificationCode.expired_date < new Date()) {
      throw new HttpException(
        'Kode verifikasi tidak valid atau sudah kadaluarsa',
        400,
      );
    }

    user.verified = true;
    await this.userRepository.save(user);
    await this.verificationCodeRepository.remove(verificationCode);
  }

  async getProfile(username: string) {
    return this.userRepository.findOne({
      where: { username },
      relations: ['carSeries', 'carYear', 'engineCode'],
    });
  }
}
