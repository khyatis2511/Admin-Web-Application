import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { RolesGuard } from './guards/role.guard';
import { Roles } from 'src/shared/dto/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('register/user')
  signUp(@Body() signUpDto: Record<string, any>) {
    return this.authService.signUp(signUpDto);
  }

  @Post('expire-password-link')
  passwordLinkExpire(@Param() param: any) {
    // need to call it at front end to expire link
    return this.authService.passwordLinkExpire(param.token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile() {
    // for demo
    return { status: 'success', messgae: 'this is private api' };
  }
}
