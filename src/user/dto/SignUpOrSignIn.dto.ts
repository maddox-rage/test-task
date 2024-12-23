import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpOrSignInDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
