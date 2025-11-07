import { Controller, Post, Body,Get, UseGuards, Req } from '@nestjs/common';
import { GroupService } from './group.service';
import type { GroupDto } from '../../../../packages/common/src/dto/group.dto'
import type { PayloadDto } from '../../../../packages/common/src/dto/auth.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('group')
@UseGuards(AuthGuard)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  // @Post("create")
  // create(@Body() groupDto: GroupDto,@Req() req: Request & {user: PayloadDto}) {
  //   const user = req.user.id;
  //   return this.groupService.create(groupDto, user);
  // }

  
  @Post("join")
  join(@Body() groupDto: GroupDto,@Req() req: Request & {user: PayloadDto} ) {
    const user = req.user.id;
    return this.groupService.join(groupDto, user)
  }

  // @Get()
  // members(@Body() groupDto: GroupDto ) {
  //   return this.groupService.getMembers(groupDto)
  // }
}
