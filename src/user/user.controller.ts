import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { SignUpOrSignInDto } from './dto/signUpOrSignIn.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':id')
  async getUserById(@Param('id') userId: number): Promise<User | null> {
    return this.userService.getUserById(Number(userId));
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post('/signUp')
  async signUp(
    @Body() userData: SignUpOrSignInDto,
  ): Promise<{ user: User; token: string }> {
    return this.userService.signUp(userData);
  }

  @Post('signIn')
  async signIn(
    @Body() userData: SignUpOrSignInDto,
  ): Promise<{ user: User; token: string }> {
    return this.userService.signIn(userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: number): Promise<User> {
    return this.userService.deleteUser(Number(userId));
  }
}
