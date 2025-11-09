import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import type { EventDto, ResultDto } from '../../../../packages/common/src/dto/event.dto';
import { DrizzleService } from '../db/drizzle.service';
import { event } from '../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class EventService {
  constructor(private readonly drizzle: DrizzleService) {}

  async findOne(id: string) {
    const eventcheack = await this.drizzle.db.select().from(event).where(eq(event.id, id));
    return  eventcheack.length > 0 ? eventcheack[0] : null;
  }

  async create(eventDto: EventDto, user: string) {
    const exists = await this.findOne(eventDto.id);

    if(exists) {
      throw new HttpException('この合言葉は使用されています', HttpStatus.CONFLICT)
    }

    return (await this.drizzle.db.insert(event)
          .values({
            id: eventDto.id,
            host_user: user,
            location_name: eventDto.location_name,
            latitude: eventDto.latitude || 0,
            longitude: eventDto.longitude || 0,
            meeting_time: new Date(eventDto.meeting_time),
            minute: eventDto.minute || 1,
            penalty: eventDto.penalty || 0,
            members: [user]
          })
          .returning())[0];
  }

  async getResult (resultDto: ResultDto) {
    const ThisEvent = await this.drizzle.db.select().from(event).where(eq(event.id, resultDto.id));
    const eventInfo = ThisEvent[0];

    const meetingTime = new Date(eventInfo.meeting_time);
    const results = resultDto.members.map(member => {
      const arrived = new Date(member.arrived_at);
      const laet = meetingTime.getTime() - arrived.getTime();

      const laetMinutes = Math.floor(laet / 1000 / 60);
      const penaltyTime = laetMinutes / eventInfo.minute;
      const penaltyPrice = penaltyTime * eventInfo.penalty;

      return { member: member.id, penaltyTime, penaltyPrice };
    }) 

    return results;
  }
}
