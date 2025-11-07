import { Module, forwardRef } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { GroupService } from 'src/group/group.service'; 
import { DrizzleModule } from 'src/db/drizzle.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DrizzleModule, forwardRef(() => AuthModule)],
  controllers: [EventController],
  providers: [EventService, GroupService], 
})
export class EventModule {}
