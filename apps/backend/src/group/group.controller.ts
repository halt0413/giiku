import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupService } from './group.service';
import type { GroupDto } from '../../../../packages/common/src/dto/group.dto'


@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() groupDto: GroupDto) {
    return this.groupService.create(groupDto);
  }
}
