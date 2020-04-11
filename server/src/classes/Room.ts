import { Room as BaseRoom } from '@/types';
import { User } from '@/classes';
import { getRoom } from '@/services/RoomsService';
import { uuidShort, uuid } from '@/utils';

export class Room implements Required<BaseRoom> {
  constructor(roomInfo: Omit<BaseRoom, 'id' | 'users'>) {
    let roomId = uuidShort();

    while (getRoom(roomId)) {
      roomId = uuidShort();
    }

    this.id = roomId;
    this.name = roomInfo.name || `room ${roomId}`;
    this.avatar = roomInfo.avatar || 'img/default-avatar.png';
    this.usersLimit = roomInfo.usersLimit;
    this.password = roomInfo.password || null;
  }

  public readonly id: NonNullable<BaseRoom['id']>;

  public readonly name: NonNullable<BaseRoom['name']>;

  public readonly avatar: NonNullable<BaseRoom['avatar']>;

  public readonly usersLimit: NonNullable<BaseRoom['usersLimit']>;

  public readonly password: BaseRoom['password'];

  public get users(): BaseRoom['users'] {
    return this.backendUsers.map((user) => user.baseUser);
  }

  public get baseRoom(): Required<BaseRoom> {
    return {
      id: this.id,
      name: this.name,
      avatar: this.avatar,
      users: this.users,
      usersLimit: this.usersLimit,
      // на фронт не отдаем реальный пароль
      password: this.password ? uuid() : null,
    };
  }

  public backendUsers: User[] = [];
}
