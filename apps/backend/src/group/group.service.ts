import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import type{ GroupDto } from '../../../../packages/common/src/dto/group.dto'
@Injectable()

export class GroupService {
  constructor( ) {}

  private groups: GroupDto[] = [];

  async create(groupDto: GroupDto, user: string) {

    if (!user) {
      throw new HttpException('ユーザーが存在しません', HttpStatus.NOT_FOUND)
    }

    const exists = this.groups.find(g => g.id === groupDto.id);
     if (exists) {
      throw new HttpException('グループが存在しません', HttpStatus.NOT_FOUND)
     }

    groupDto.members = [user];
    this.groups.push(groupDto);

    return { message : "グループ作成しました", groupID : groupDto.id };
  }

  async join(groupDto: GroupDto, user: string) {
    const group = this.groups.find(g => g.id === groupDto.id);

    if (!group) {
      throw new HttpException('グループが存在しません', HttpStatus.NOT_FOUND)
    }

    if (!(group.members!).includes(user)) {
      group.members!.push(user);
    }

    return { message: "グループに入室しました"};
  }

  async getMembers(groupDto) {
    const group = this.groups.find(g => g.id === groupDto.id);
    if (!group) return { error: 'Group not found' };
    return group.members;
  }
}
