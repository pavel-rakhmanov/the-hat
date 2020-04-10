import { Room as BaseRoom } from '@/types';
import { User } from '@/classes';
import { getRoom } from '@/services/RoomsService';
import { uuidShort } from '@/utils';

export class Room implements BaseRoom {
  constructor(roomInfo: Omit<BaseRoom, 'id' | 'users'>) {
    let roomId = uuidShort();

    while (getRoom(roomId)) {
      roomId = uuidShort();
    }

    this.id = roomId;
    this.name = roomInfo.name || `room ${roomId}`;
    this.avatar = roomInfo.avatar || 'public/img/default-avatar.png';
    this.usersLimit = roomInfo.usersLimit;
  }

  public readonly id: NonNullable<BaseRoom['id']>;

  public readonly name: NonNullable<BaseRoom['name']>;

  public readonly avatar: NonNullable<BaseRoom['avatar']>;

  public readonly usersLimit: NonNullable<BaseRoom['usersLimit']>;

  public get users(): BaseRoom['users'] {
    return this.backendUsers.map((user) => user.baseUser);
  }

  public get baseRoom(): BaseRoom {
    return {
      id: this.id,
      name: this.name,
      avatar: this.avatar,
      users: this.users,
      usersLimit: this.usersLimit,
    };
  }

  public backendUsers: User[] = [];
}
