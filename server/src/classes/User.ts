import { BaseUser } from '@/types';
import { getUser } from '@/services/UsersService';
import { uuid } from '@/utils';

export class User implements BaseUser {
  constructor(userInfo: Partial<BaseUser>) {
    let userId = uuid();

    while (getUser(userId)) {
      userId = uuid();
    }

    this.baseUser = {
      name: `user ${userId}`,
      avatar: 'public/img/default-avatar.png',
      ...userInfo,
      id: userId,
    };
  }

  public readonly baseUser: BaseUser;

  public get id(): BaseUser['id'] { return this.baseUser.id; }

  public get name(): BaseUser['name'] { return this.baseUser.name; }

  public get avatar(): BaseUser['avatar'] { return this.baseUser.avatar; }

  public socket: SocketIO.Socket | null = null;

  public get namespaces(): string[] {
    if (!this.socket) return [];

    return Object.values(this.socket.rooms);
  }
}
