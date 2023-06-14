import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/modules/prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(text, user): Promise<any> {
    const data = {
      text,
      userId: user.id,
    };
    const result = await this.prisma.transaction.create({ data });
    if (result) {
      return { status: 'success', message: 'Transaction created successfully' };
    } else {
      return { status: 'error', message: 'Something went wrong' };
    }
  }

  async viewTransaction(user): Promise<any> {
    const result = await this.prisma.transaction.findMany({
      where: {
        AND: [
          {
            userId: {
              equals: user.id,
            },
          },
          {
            isDeleted: {
              equals: false,
            },
          },
        ],
      },
    });
    if (result) {
      return {
        status: 'success',
        message: 'Transaction fetched successfully',
        data: result,
      };
    } else {
      return { status: 'error', message: 'Unable to get transaction.' };
    }
  }

  async deleteTransaction(transactionId): Promise<any> {
    // soft delete
    const result = await this.prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: { isDeleted: true },
    });
    if (result) {
      return { status: 'success', message: 'Transaction deleted successfully' };
    } else {
      return { status: 'error', message: 'Unable to delete transaction' };
    }
  }

  async viewAllTransaction(): Promise<any> {
    const result = await this.prisma.transaction.findMany({
      where: {
        isDeleted: {
          equals: false,
        },
      },
    });
    if (result) {
      return {
        status: 'success',
        message: 'Transaction fetched successfully',
        data: result,
      };
    } else {
      return { status: 'error', message: 'Unable to get transaction.' };
    }
  }
}
