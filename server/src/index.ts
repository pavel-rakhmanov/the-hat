import fs from 'fs';
import http from 'http';
import path from 'path';
import chalk from 'chalk';
import express from 'express';
import socketIo from 'socket.io';
// @ts-ignore
import upload from 'express-fileupload';
// @ts-ignore
import cors from 'cors';

import { RoomService, UserService } from './services';

import { User, Room } from '../../types';
import { RestEndpoints, SocketEmits, SocketNamespace } from '../../enums';

const SERVER_PORT = 8000;

const app = express();

app.use(upload());
app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send(fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8'));
});

app.post(`/${RestEndpoints.UploadImage}`, async (req, res) => {
  // @ts-ignore
  const photo = req.files?.photo;
  const userId = req.body.userId;

  if(!photo || !userId) return;

  // @ts-ignore
  const imgPath = 'public/img/' + photo.name

  // @ts-ignore
  photo.mv(path.join(__dirname, imgPath), (err) => {
    if (err) {
      res.status(500).send(`error: ${err}`)
    } else {
      res.status(200).send({
        image: imgPath
      })

      UserService.updateUser({
        id: userId,
        avatar: imgPath,
      })
    }
  })
});

const server = http.createServer(app);

server.listen(SERVER_PORT, () => {
  console.log(`The server is running on ${chalk.blueBright.underline(`http://localhost:${SERVER_PORT}`)}`)
})

export const io = socketIo(server)

io.on('connection', (socket) => {
  UserService.addUser({ id: socket.id });
  const user = UserService.getUser(socket.id);

  if (!user) return;
  socket.emit(SocketEmits.User, user);
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

  socket.on(SocketEmits.User, () => {
    socket.emit(SocketEmits.User, user)
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