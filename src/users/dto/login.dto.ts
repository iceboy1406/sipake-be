import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Username harus diisi' })
  username: string;

  @IsNotEmpty({ message: 'Password harus diisi' })
  password: string;
}
