import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { GroupModule } from './modules/group/group.module';

@Module({
  imports: [AuthModule, GroupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
