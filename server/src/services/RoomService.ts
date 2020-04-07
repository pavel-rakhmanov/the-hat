import { Room, User } from '../../../types';
import { SocketEmits, SocketNamespace } from '../../../enums';

import { io } from '../index'

const ROOMS_MAP = new Map<Room['id'], Room>();

export function addRoom(room: Room) {
  ROOMS_MAP.set(room.id, {
    name: `room ${room.id}`,
    ...room
  });
  updateRooms();
}

export function addRoomUser(roomId: Room['id'], user: User) {
  const room = getRoom(roomId);

  if (!room) return

  if (room.users.length < room.usersLimit) {
    room.users.push(user);
    user.roomId = roomId;
    console.log(`user ${user.id} enter the ${room.name}`)
    updateRooms();
  }
}

export function getRoom(roomId: Room['id']) {
  return ROOMS_MAP.get(roomId);
}

export function getRooms() {
  return Array.from(ROOMS_MAP.values());
}

export function removeRoomUser(roomId: Room['id'], userId: User['id']) {
  const room = getRoom(roomId);

  if (!room) return

  room.users = room.users.filter(user => user.id !== userId);
  console.log(`user ${userId} leave the ${room.name}`)
  updateRooms();
}

export function removeRoom(roomId: Room['id']) {
  ROOMS_MAP.delete(roomId);
  updateRooms();
}

function updateRooms() {
  io && io.in(SocketNamespace.Rooms).emit(SocketEmits.Rooms, getRooms());
}

// Периодически чистим не используемые комнаты
setInterval(() => {
  getRooms()
    .filter(room => room.users.length === 0)
    .forEach(room => removeRoom(room.id))
}, 1000 * 60 * 5)

const defaultRooms: Room[] = [
  {
    id: 'r1',
    users: [],
    teams: [],
    timePerRound: 6000,
    usersLimit: 4,
    words: []
  },
  {
    id: 'r2',
    users: [],
    teams: [],
    timePerRound: 6000,
    usersLimit: 0,
    words: []
  },
  {
    id: 'r3',
    users: [],
    teams: [],
    timePerRound: 6000,
    usersLimit: 6,
    words: []
  }
];

defaultRooms.forEach(addRoom)