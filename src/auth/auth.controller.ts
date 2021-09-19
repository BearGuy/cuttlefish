import { Controller, Request, Res, Body, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from './../users/dto/create-user.dto';
// import { UpdateUserDto } from './../users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // vulnerable and open route, need to limit access
  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    console.log({ })
    return this.authService.register(createUserDto);
  }

  // Also vulnerable, need to set permission on changing passwords. Use JWT for this?
//   @UseGuards(AuthGuard('jwt-update-user'))
//   @Post('/password')
//   async updatePassword(@Body() updateUserDto: UpdateUserDto) {
//     return this.authService.updatePassword(updateUserDto);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Get('/profile')
//   getProfile(@Request() req) {
//     return this.usersService.getProfile(req.user.id);
//   }

}
