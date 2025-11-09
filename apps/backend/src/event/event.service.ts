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
  // 同じ合言葉のイベントがないかチェック
    const exists = await this.findOne(eventDto.id);
    if (exists) {
      throw new HttpException('この合言葉は使用されています', HttpStatus.CONFLICT);
    }

    // meeting_time が正しい HH:mm 形式かチェック
    if (!eventDto.meeting_time || !/^\d{1,2}:\d{2}$/.test(eventDto.meeting_time)) {
      throw new HttpException('meeting_time の形式が不正です', HttpStatus.BAD_REQUEST);
    }

    // HH:mm → Date に変換（今日の日付 + 時刻）
    const [hours, minutes] = eventDto.meeting_time.split(':').map(Number);
    const now = new Date();
    const meetingDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );

    // latitude / longitude のデフォルト値
    const latitude = eventDto.latitude ?? 0;
    const longitude = eventDto.longitude ?? 0;
    const minute = eventDto.minute ?? 1;
    const penalty = eventDto.penalty ?? 0;

    try {
      return (await this.drizzle.db.insert(event)
        .values({
          id: eventDto.id,
          host_user: user,
          location_name: eventDto.location_name,
          latitude,
          longitude,
          meeting_time: meetingDate, // timestamp に Date を渡す
          minute,
          penalty,
          members: [user], // 初期メンバーはホストのみ
        })
        .returning())[0];
    } catch (err) {
      console.error('DB insertion error:', err);
      throw new HttpException('イベント作成に失敗しました', 500);
    }
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
