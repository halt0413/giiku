import { Module, forwardRef } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { GroupService } from '../group/group.service'; 
import { DrizzleModule } from '../db/drizzle.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DrizzleModule, forwardRef(() => AuthModule)],
  controllers: [EventController],
  providers: [EventService, GroupService], 
})
export class EventModule {}
