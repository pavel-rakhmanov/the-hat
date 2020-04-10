import { Room as BaseRoom } from '@/types';
import { SocketEmits, SocketNamespace } from '@/enums';
import { Room } from '@/classes';
import { io } from '@/index';

const ROOMS_MAP = new Map<Room['id'], Room>();

export function getRooms(): Room[] {
  return Array.from(ROOMS_MAP.values());
}

export function getBaseRooms(): BaseRoom[] {
  return getRooms().map((room) => room.baseRoom);
}

export function updateRooms(): void {
  io && io.in(SocketNamespace.Rooms).emit(SocketEmits.Rooms, getBaseRooms());
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
