import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: User) {
    const payload = { email: user.email, sub: user.id };
    return { token: this.jwtService.sign(payload) };
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify<any>(token);
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
