import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { UserDto } from 'src/users/dtos/user.dto';
import { User } from 'src/users/models/users.model';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() createUserDto: UserDto) {
    return this.authService.register(
      createUserDto.email,
      createUserDto.password,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() signInDto: UserDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Get('profile')
  getProfile(@Request() req: any) {
    const user: User = req.user;
    if (!user) {
      return { message: 'Unauthorized' };
    }

    return this.authService.getProfile(user.email);
  }
}
