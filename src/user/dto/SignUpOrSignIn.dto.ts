import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpOrSignInDto {
  @ApiProperty({
    description: 'The email address of the user',
    type: String,
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password for the user account',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
