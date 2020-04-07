import { User } from '../../../types'

const USERS_MAP = new Map<User['id'], User>();

export const UserService = {
  addUser(user: User) {
    USERS_MAP.set(user.id, {
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
  
    USERS_MAP.set(newUser.id, {
      ...oldUser,
      ...newUser
    })
  },
  removeUser(userId: User['id']) {
    USERS_MAP.delete(userId);
  }
}
