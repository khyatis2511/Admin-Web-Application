import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Param,
  Request,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from 'src/shared/dto/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @HttpCode(HttpStatus.OK)
  @Roles(Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('')
  createGroup(@Body() groupDto: Record<string, any>, @Request() req) {
    return this.groupService.createGroup(groupDto, req.user);
  }

  @Roles(Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/:groupId/assign-admin')
  assignAdmin(@Body() userDto: Record<string, any>, @Param() groupId: string) {
    return this.groupService.assignAdmin(groupId, userDto.userId);
  }
}
