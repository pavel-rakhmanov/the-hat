import { User } from '../../../types'
import { SocketEmits, SocketNamespace } from '../../../enums';

const USERS_MAP = new Map<User['id'], User>();

import { io } from '../index';

export const UserService = {
  addUser(user: User) {
    USERS_MAP.set(user.id, {
      avatar: `https://avatars.dicebear.com/v2/human/${user.id}.svg`,
      name: `user ${user.id}`,
      ...user
    });
  },
  getUser(userId: User['id']) {
    return USERS_MAP.get(userId)
  },
  updateUser(newUser: Pick<User, 'id'> & Partial<User>) {
    const oldUser = this.getUser(newUser.id)

    if (!oldUser) return
  
    Object.assign(oldUser, newUser)
  },
  removeUser(userId: User['id']) {
    USERS_MAP.delete(userId);
  }
}
