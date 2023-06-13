import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { PrismaService } from 'src/shared/modules/prisma/prisma.service';
import { GroupController } from './group.controller';

@Module({
  providers: [GroupService, PrismaService],
  controllers: [GroupController],
  exports: [GroupService],
})
export class GroupModule {}
