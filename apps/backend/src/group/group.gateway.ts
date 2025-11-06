import { WebSocketGateway, WebSocketServer, SubscribeMessage, ConnectedSocket, MessageBody, OnGatewayConnection, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import type { GroupDto } from '../../../../packages/common/src/dto/group.dto'
import type { PayloadDto } from '../../../../packages/common/src/dto/auth.dto';
import { GroupService } from './group.service';
// import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@WebSocketGateway({cors: { origin : "*"}})

export class GroupsGateway implements OnGatewayConnection {

    constructor(private readonly groupService: GroupService, private readonly jwt: JwtStrategy) {}
    handleConnection(client: Socket) {
        try {
            const token = client.handshake.auth.token;
            const payload = this.jwt.validate(token);
            client.data.user = payload;
        } catch (error) {
            client.disconnect();
        }
    }
    @WebSocketServer()
    server : Server;

    @SubscribeMessage('join')
    async handleJoinGroup(@ConnectedSocket() client: Socket, @MessageBody() groupDto: GroupDto) {
        const user = client.data.user;

        const result = await this.groupService.join({ id: groupDto.id }, user);
        if ('error' in result) {
            client.emit('error', result.error);
            return;
        }

        client.join(groupDto.id);
        const members = await this.groupService.getMembers({ id: groupDto.id });
        this.server.to(groupDto.id).emit('membersUpdate', members);
    }
}
