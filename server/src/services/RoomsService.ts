import { Room as BaseRoom } from '@/types';
import { SocketEmits, SocketNamespace } from '@/enums';
import { Room, User } from '@/classes';
import { io } from '@/index';

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

export function addRoomUser(roomId: Room['id'], user: User): void {
  const room = getRoom(roomId);

  if (!room) return;

  room.backendUsers.push(user);

  console.log(`User with id='${user.id}' enter to the room with id='${roomId}'`);

  updateRoom(room);
}

export function removeRoomUser(roomId: Room['id'], user: User): void {
  const room = getRoom(roomId);

  if (!room) return;

  room.backendUsers = room.backendUsers.filter(({ id }) => id !== user.id);

  console.log(`User with id='${user.id}' leaving the room with id='${roomId}'`);

  updateRoom(room);
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
      users: [{
        id: 'r1u1',
        name: 'r1 static user',
        avatar: 'https://randomuser.me/api/portraits/women/69.jpg',
      }],
      usersLimit: 4,
    },
    {
      id: 'r2',
      users: [],
      usersLimit: 0,
    },
    {
      id: 'r3',
      users: [],
      usersLimit: 6,
    },
  ];

  defaultRooms.forEach(addRoom);
}());
