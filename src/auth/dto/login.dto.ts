import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @MinLength(6, {
    message: 'Min 6',
  })
  @IsString()
  password: string;
}
