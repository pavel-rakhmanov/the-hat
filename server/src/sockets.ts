import { Server } from 'http';
import socketIo from 'socket.io';

import { UsersService, RoomsService } from '@/services';
import { SocketEmits, SocketNamespace } from '@/enums';
import { User, Room } from '@/classes';

export function createIo(server: Server): socketIo.Server {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    let user: User | null = null;

    socket.on(SocketEmits.BindUserId, (userId: User['id']) => {
      const bindingUser = UsersService.getUser(userId);

      if (!bindingUser) {
        console.log(`User with id='${userId}' not found`);
        return;
      }

      bindingUser.socket = socket;
      user = bindingUser;

      console.log(`User with id='${userId}' was successfully bind to socket with id='${socket.id}'`);
    });

    socket.on(SocketEmits.Rooms, () => {
      if (!user?.socket) return;

      user.socket
        .join(SocketNamespace.Rooms)
        .emit(SocketEmits.Rooms, RoomsService.getBaseRooms());
    });

    socket.on(SocketEmits.AddRoom, (room: Room) => {
      if (!user?.socket) return;

      RoomsService.addRoom(room);
    });

    socket.on(SocketEmits.EnterRoom, (roomId: Room['id']) => {
      if (!user?.socket) return;

      const room = RoomsService.getRoom(roomId);

      if (room) room.addUser(user);

      console.log(`User with id='${user.id}' namespaces: [${user.namespaces}]`);
    });

    socket.on(SocketEmits.LeaveRoom, (roomId: Room['id']) => {
      if (!user?.socket) return;

      const room = RoomsService.getRoom(roomId);

      if (room) room.removeUser(user);

      console.log(`User with id='${user.id}' namespaces: [${user.namespaces}]`);
    });

    socket.on('disconnect', () => {
      if (!user?.socket) return;

      user.socket = null;
    });
  });

  return io;
}
