import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserDto } from 'src/users/dtos/user.dto';
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
}
