import { Injectable } from '@nestjs/common';
import { GroupDto } from '../../../../packages/common/src/dto/group.dto'
@Injectable()
export class GroupService {
  constructor( ) {}

  async create(groupDto: GroupDto) {
    
  }
}
