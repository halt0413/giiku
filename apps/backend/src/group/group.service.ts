import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import type { GroupDto } from '../../../../packages/common/src/dto/group.dto';
import { DrizzleService } from '../db/drizzle.service';
import { event } from '../db/schema';
import {  sql, eq } from 'drizzle-orm';

@Injectable()
export class GroupService {
  constructor(private readonly drizzleService: DrizzleService ) {}

  private groups: GroupDto[] = [];

  async create(groupDto: GroupDto, user: string) {
    groupDto.members = [user];
    this.groups.push(groupDto);

    return { message : "グループ作成しました", groupID : groupDto.id };
  }

  async join(groupDto: GroupDto, user: string) {
    const group = await this.drizzleService.db
      .select()
      .from(event)
      .where(eq(event.id, groupDto.id))
      .limit(1)
      .then(res => res[0]);

    if (!group) {
      throw new HttpException('グループが存在しません', HttpStatus.NOT_FOUND)
    }

    if (!(group.members!).includes(user)) {
      group.members!.push(user);

      const eventIn = await this.drizzleService.db.update(event)
      .set({
        members: sql`array_append(${event.members}, ${user})`,
      })
      .where(eq(event.id, groupDto.id));

    }

    const location = group.location_name;
    const meeting_time = new Date(group.meeting_time).toISOString().slice(11, 16);

    return { message: "グループに入室しました", location, meeting_time};
  }

  async getMembers(groupDto) {
    const group = await this.drizzleService.db
      .select()
      .from(event)
      .where(eq(event.id, groupDto.id))
      .limit(1)
      .then(res => res[0]);
    if (!group) return { error: 'Group not found' };

    const member = await this.drizzleService.db
      .select({ members: event.members })
      .from(event)
      .where(eq(event.id, groupDto.id));

    return member[0]?.members ?? [];
  }
}
