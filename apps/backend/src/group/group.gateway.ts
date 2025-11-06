import { WebSocketGateway, WebSocketServer, SubscribeMessage, ConnectedSocket, MessageBody, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GroupDto } from '../../../../packages/common/src/dto/group.dto'

@WebSocketGateway({
    cors: { origin : "*"},
})

export class GroupsGateway {
    @WebSocketServer()
    server : Server;

    @SubscribeMessage('join')
        handleJoinGroup(@ConnectedSocket() client: Socket, @MessageBody() groupId: string) {
        client.join(groupId);
        client.emit('joinedGroup', `Joined group ${groupId}`);
    }
}
