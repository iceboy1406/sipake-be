import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  @ResponseMessage('Registrasi berhasil')
  @UseInterceptors(FileInterceptor('profilePicture'))
  create(
    @Body() registerDto: RegisterDto,
    @UploadedFile() profilePicture: Express.Multer.File,
  ) {
    return this.usersService.register(registerDto, profilePicture);
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
    return this.usersService.getProfile(req.username);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @Post('verify')
  @ResponseMessage('Berhasil verifikasi email')
  verifyEmail(@Body() body: { username: string; code: string }) {
    return this.usersService.verifyEmail(body.username, body.code);
  }
}
