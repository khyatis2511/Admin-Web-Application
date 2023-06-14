import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Param,
  Request,
  Delete,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from 'src/shared/dto/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @HttpCode(HttpStatus.OK)
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('')
  createTransaction(
    @Body() transactionDto: Record<string, any>,
    @Request() req,
  ) {
    return this.transactionService.createTransaction(
      transactionDto.text,
      req.user,
    );
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('user')
  viewTransaction(@Request() req) {
    return this.transactionService.viewTransaction(req.user);
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:transactionId')
  deleteTransaction(@Param() params: any) {
    return this.transactionService.deleteTransaction(params?.transactionId);
  }

  @Roles(Role.SupportDesk)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('')
  viewAllTransaction() {
    return this.transactionService.viewAllTransaction();
  }
}
