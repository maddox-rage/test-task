import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';
import { SignUpOrSignInDto } from './dto/signUpOrSignIn.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async signUp(dto: SignUpOrSignInDto): Promise<{ user: User; token: string }> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (existingUser) {
      throw new HttpException('email has be taken', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword,
      },
    });
    const token = await this.authService.generateToken(user);
    return { user: user, ...token };
  }
  async signIn(dto: SignUpOrSignInDto): Promise<{ user: User; token: string }> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!existingUser) {
      throw new HttpException(
        'invalid email or password',
        HttpStatus.NOT_FOUND,
      );
    }
    const isMatch = await bcrypt.compare(dto.password, existingUser.password);
    if (!isMatch) {
      throw new HttpException(
        'invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const token = await this.authService.generateToken(existingUser);
    return { user: existingUser, ...token };
  }
  async getUserById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not Found');
    }
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    if (!users || users.length === 0) {
      throw new NotFoundException('Users not Found');
    }
    return users;
  }

  async deleteUser(id: number): Promise<User> {
    await this.getUserById(id);
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
