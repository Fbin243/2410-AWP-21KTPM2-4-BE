import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    email: string,
    password: string,
  ): Promise<{ message: string }> {
    const user = await this.usersService.findOne(email);
    if (user) {
      throw new UnauthorizedException('User already exists');
    }

    await this.usersService.create(email, password);
    return { message: 'User created successfully' };
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ id: string; email: string; access_token: string }> {
    const user = await this.usersService.findOne(email);
    if (!user && !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Login failed. Check your credentials');
    }
    const payload = { sub: user._id, email: user.email };
    return {
      id: user._id,
      email: user.email,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getProfile(email: string): Promise<{ id: string; email: string }> {
    const user = await this.usersService.findOne(email);
    return {
      id: user._id,
      email: user.email,
    };
  }
}
