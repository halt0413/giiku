import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { EventService } from './event.service';
import { GroupService } from '../group/group.service';
import type { PayloadDto } from '../../../../packages/common/src/dto/auth.dto';
import type { EventDto } from '../../../../packages/common/src/dto/event.dto';
import type { ResultDto } from '../../../../packages/common/src/dto/event.dto';
import { AuthGuard } from '../auth/auth.guard';


@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService, private readonly groupService: GroupService) {}

  @Get()
  async findOne(@Param('id') id: string) {
    return await this.eventService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post("create")
  async create(@Body() eventDto: EventDto,@Req() req: Request & {user: PayloadDto}) {
    const user = req.user.id;
    //DBにevent保存
    const DBEvent = await this.eventService.create(eventDto, user);

    //Socketでグループ作成
    const GroupDto = {
      id: eventDto.id,
      user,
      members:[],
    }
    const SocketGroup = await this.groupService.create(GroupDto, user);

    return {id: DBEvent.id, location:DBEvent.location_name, meeting_time: new Date(DBEvent.meeting_time) , Socket: SocketGroup};
  }

  @Post("result")
  async result (@Body () resultDto: ResultDto){
    return await this.eventService.getResult(resultDto)
  }
}
