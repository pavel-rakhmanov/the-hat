import { BaseUser } from '@/types';
import { getUser } from '@/services/UsersService';
import { uuid } from '@/utils';

export class User implements BaseUser {
  constructor(userInfo: Partial<Omit<BaseUser, 'id'>>) {
    let userId = uuid();

    while (getUser(userId)) {
      userId = uuid();
    }

    this.id = userId;
    this.name = userInfo.name || `user ${userId}`;
    this.avatar = userInfo.avatar || 'public/img/default-avatar.png';
  }

  public readonly id: NonNullable<BaseUser['id']>;

  public readonly name: NonNullable<BaseUser['name']>;

  public readonly avatar: NonNullable<BaseUser['avatar']>;

  public socket: SocketIO.Socket | null = null;

  public get baseUser(): BaseUser {
    return {
      id: this.id,
      name: this.name,
      avatar: this.avatar,
    };
  }

  public get namespaces(): string[] {
    if (!this.socket) return [];

    return Object.values(this.socket.rooms);
  }
}
