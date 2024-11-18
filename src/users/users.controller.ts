import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  @ResponseMessage('Registrasi berhasil')
  create(@Body() registerDto: RegisterDto) {
    return this.usersService.register(registerDto);
  }

  @Post('login')
  @ResponseMessage('Login berhasil')
  login(@Body() loginUserDto: LoginDto) {
    return this.usersService.login(loginUserDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  @ResponseMessage('Berhasil mendapatkan data profil')
  getProfile(@Request() req: { username: string }) {
    console.log({ req });
    return this.usersService.getProfile(req.username);
  }
}
