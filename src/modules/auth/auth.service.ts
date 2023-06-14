import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PrismaService } from 'src/shared/modules/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/shared/enums/role.enum';
import { MailService } from '../mail/mail.service';
import { async } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email, roles: user.roles };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }

  async signUp(signUpData): Promise<any> {
    if (
      signUpData.roles.includes(Role.Admin) ||
      signUpData.roles.includes(Role.SupportDesk) ||
      signUpData.roles.includes(Role.SuperAdmin)
    ) {
      throw new UnauthorizedException();
    }
    const result = await this.usersService.createUserOrPowerUser({
      ...signUpData,
      passwordToken: 'temp28274vjsfvbkf',
    });

    if (result) {
      const sendMailResult = await this.mailService.sendMail(
        result.email,
        `localhost:3000/password?token=${result.passwordToken}`,
      );
      if (sendMailResult.messageId) {
        return {
          status: 'success',
          message: 'One time password link sent to your email',
        };
      } else {
        return {
          status: 'error',
          message: 'Unable to send One time password link',
        };
      }
    } else {
      return { status: 'error', message: 'Unable to create user' };
    }
  }

  async passwordLinkExpire(token): Promise<any> {
    const result = await this.prisma.user.update({
      where: {
        passwordToken: token,
      },
      data: { isPasswordTokenExpired: true },
    });
    if (result) {
      return { status: 'success', message: 'Link Expired' };
    } else {
      return { status: 'error', message: 'SOmething went wrong' };
    }
  }
}
