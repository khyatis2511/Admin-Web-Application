import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/modules/prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async createGroup(groupData, user): Promise<any> {
    const result = await this.prisma.group.create({ data: groupData });
    if (result) {
      // temp adding 2 relation user for operation - after remove with actual requiement
      const userResult = await this.prisma.groupHasUser.createMany({
        data: [
          { groupId: result.id, userId: user.id },
          { groupId: result.id, userId: '6488ba30399f68816a4ae917' },
        ],
      });
    }
    if (result) {
      return { status: 'success', message: 'Group created successfully' };
    } else {
      return { status: 'error', message: 'Something went wrong' };
    }
  }

  async assignAdmin(groupId, userId): Promise<any> {
    const result = await this.prisma.groupHasUser.findFirst({
      where: {
        AND: [groupId, { userId }],
      },
    });
    if (result) {
      const updateOne = await this.prisma.groupHasUser.update({
        where: {
          id: result.id,
        },
        data: { isAdmin: true },
      });
      if (updateOne) {
        return { status: 'success', message: 'Admin assigned successfully' };
      } else {
        return { status: 'error', message: 'Unable to assign admin' };
      }
    } else {
      return { status: 'error', message: 'Unable to assign admin' };
    }
  }
}
