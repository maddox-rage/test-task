import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/guards/jwtAuth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { SignUpOrSignInDto } from 'src/user/dto/SignUpOrSignIn.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') userId: number): Promise<User | null> {
    return this.userService.getUserById(Number(userId));
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The list of users has been successfully retrieved.',
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully signed up.',
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided.' })
  @Post('/signUp')
  async signUp(
    @Body() userData: SignUpOrSignInDto,
  ): Promise<{ user: User; token: string }> {
    return this.userService.signUp(userData);
  }

  @ApiOperation({ summary: 'Sign in an existing user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully signed in.',
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  @Post('signIn')
  async signIn(
    @Body() userData: SignUpOrSignInDto,
  ): Promise<{ user: User; token: string }> {
    return this.userService.signIn(userData);
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') userId: number): Promise<User> {
    return this.userService.deleteUser(Number(userId));
  }
}
