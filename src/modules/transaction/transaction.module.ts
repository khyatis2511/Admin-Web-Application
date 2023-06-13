import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { PrismaService } from 'src/shared/modules/prisma/prisma.service';
import { TransactionController } from './transaction.controller';

@Module({
  providers: [TransactionService, PrismaService],
  controllers: [TransactionController],
  exports: [TransactionService],
})
export class TransactionModule {}
