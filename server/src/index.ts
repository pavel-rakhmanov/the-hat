import fs from 'fs';
import http from 'http';
import path from 'path';
import chalk from 'chalk';
import socketIo from 'socket.io';

import { RoomService, UserService } from './services';

import { User, Room } from '../../types';
import { SocketEmits, SocketNamespace } from '../../enums';

const SERVER_PORT = 8000;

const httpServer = http.createServer((req, res) => {
  res.writeHead(200);
  res.end(fs.readFileSync(path.join(__dirname,'index.html'), 'utf8'));
})

httpServer.listen(SERVER_PORT, () => {
  console.log(`The server is running on ${chalk.blueBright.underline(`http://localhost:${SERVER_PORT}`)}`)
})

export const io = socketIo(httpServer)

io.on('connection', (socket) => {
  UserService.addUser({ id: socket.id });
  const user = UserService.getUser(socket.id);

  if (!user) return;

  socket.join(SocketNamespace.Rooms);

  socket.on(SocketEmits.Rooms, () => {
    socket.emit(SocketEmits.Rooms, RoomService.getRooms());
  });

  socket.on(SocketEmits.AddRoom, (room: Room) => {
    RoomService.addRoom(room);
  });

  socket.on(SocketEmits.EnterRoom, (roomId: Room['id']) => {
    RoomService.addRoomUser(roomId, user);

    socket
      .leave(SocketNamespace.Rooms)
      .join(`${SocketNamespace.Room}${roomId}`)
  })

  socket.on(SocketEmits.LeaveRoom, (roomId: Room['id']) => {
    RoomService.removeRoomUser(roomId, user.id)

    socket
      .leave(`${SocketNamespace.Room}${roomId}`)
      .join(SocketNamespace.Rooms)
  })

  // socket.on(SocketEmits.Room, () => {
  //   console.log('user: ', user)

  //   if (!user.roomId) return


  //   const room = RoomService.getRoom(user.roomId)

  //   if (!room) return room

  //   console.log('вот твоя комната: ', room)
  //   socket.emit(SocketEmits.Room, room)
  // })

  socket.on('disconnect', () => {
    if (user.roomId) {
      RoomService.removeRoomUser(user.roomId, user.id)
    }

    UserService.removeUser(user.id)
  });
});