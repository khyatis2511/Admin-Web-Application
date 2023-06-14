import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/modules/prisma/prisma.service';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<User | undefined> {
    const result = await this.prisma.user.findFirst({
      where: { email: email },
    });
    return result;
  }

  async createUserOrPowerUser(data): Promise<any> {
    const result = await this.prisma.user.create({ data });
    return result;
  }
}
