import { Room as BaseRoom } from '@/types';
import { SocketEmits, SocketNamespace } from '@/enums';
import { Room, User } from '@/classes';
import { io } from '@/index';
import { getUser } from './UsersService';

const ROOMS_MAP = new Map<Room['id'], Room>();

export function getRooms(): Room[] {
  return Array.from(ROOMS_MAP.values());
}

export function getBaseRooms(): BaseRoom[] {
  return getRooms().map((room) => room.baseRoom);
}

function updateRoom(room: Room): void {
  const { id, baseRoom } = room;

  room.backendUsers.forEach((user) => {
    const { socket } = user;

    if (socket) socket.in(id).emit(SocketEmits.Room, baseRoom);
  });

  updateRooms();
}

function updateRooms(): void {
  if (!io) return;

  io.in(SocketNamespace.Rooms).emit(SocketEmits.Rooms, getBaseRooms());
}

export function addRoom(roomInfo: BaseRoom): Room {
  const room = new Room(roomInfo);

  ROOMS_MAP.set(room.id, room);

  updateRooms();

  return room;
}

export function getRoom(roomId: Room['id']): Room | undefined {
  return ROOMS_MAP.get(roomId);
}

export function getBaseRoom(roomId: Room['id']): BaseRoom | undefined {
  const room = getRoom(roomId);

  return room ? room.baseRoom : room;
}

export function removeRoom(roomId: Room['id']): void {
  ROOMS_MAP.delete(roomId);
  updateRooms();
}

export function addRoomUser(roomId: Room['id'], userId: User['id'], roomPassword: Room['password'] = null): void {
  try {
    const room = getRoom(roomId);

    if (!room) {
      throw new Error(`Room with id='${roomId}' was not found`);
    }

    if (room.password !== roomPassword) {
      throw new Error(`Incorrect password for room with id='${roomId}'`);
    }

    const user = getUser(userId);

    if (!user) {
      throw new Error(`User with id='${userId}' was not found`);
    }

    if (room.backendUsers.length >= room.usersLimit) {
      throw new Error(`Maximum user limit reached in room with id='${roomId}'`);
    }

    room.backendUsers.push(user);

    console.log(`User with id='${userId}' enter to the room with id='${roomId}'`);

    updateRoom(room);
  } catch(e) {
    throw new Error(e);
  }
}

export function removeRoomUser(roomId: Room['id'], userId: User['id']): void {
  try {
    const room = getRoom(roomId);

    if (!room) {
      throw new Error(`Room with id='${roomId}' was not found`);
    }

    room.backendUsers = room.backendUsers.filter(user => user.id !== userId);

    console.log(`User with id='${userId}' leaving the room with id='${roomId}'`);

    updateRoom(room);
  } catch(e) {
    throw new Error(e);
  }
}

(function periodicRoomsCleaning(): void {
  setInterval(() => {
    getRooms()
      .filter((room) => room.users.length === 0)
      .forEach((room) => removeRoom(room.id));
  }, 1000 * 60 * 5);
}());

(function makeFewMockRooms(): void {
  const defaultRooms: BaseRoom[] = [
    {
      id: 'r1',
      name: 'Комната с паролем',
      users: [],
      password:  'qwerty',
      usersLimit: 4,
    },
    {
      id: 'r2',
      name: 'Заполненная комната',
      users: [],
      usersLimit: 0,
      password: null,
    },
    {
      id: 'r3',
      name: 'Просто комната',
      users: [],
      usersLimit: 2,
      password: null
    },
  ];

  defaultRooms.forEach(addRoom);
}());
