import { Module, forwardRef } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { AuthModule } from '../auth/auth.module';
import { GroupsGateway } from './group.gateway';
import { DrizzleModule } from '../db/drizzle.module';

@Module({
  imports: [DrizzleModule, forwardRef(() => AuthModule)],
  controllers: [GroupController],
  providers: [GroupService, GroupsGateway], 
})
export class GroupModule {}
