import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 32)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 60)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 128)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\+62\d{8,13}$/, {
    message: 'phoneNumber must be a valid phone number starting with +62',
  })
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  address: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 4)
  car_series_id: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 6)
  engine_code: string;

  @IsNotEmpty()
  car_year: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  plateNumber: string;
}
