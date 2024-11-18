import { HttpException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
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

    return this.userRepository.save({
      ...registerDto,
      password: hashedPassword,
      carSeries: { series_id: registerDto.car_series_id },
      carYear: { year: registerDto.car_year },
      engineCode: { code: registerDto.engine_code },
    });
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

    const token = this.jwtService.sign({ username: user.username });
    return {
      token,
      user,
    };
  }

  async getProfile(username: string) {
    return this.userRepository.findOne({
      where: { username },
      relations: ['carSeries', 'carYear', 'engineCode'],
    });
  }
}
