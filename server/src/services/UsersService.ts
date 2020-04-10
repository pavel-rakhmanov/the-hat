import { BaseUser } from '@/types';
import { User } from '@/classes';

const USERS_MAP = new Map<User['id'], User>();

export function addUser(userInfo?: Partial<BaseUser>): User {
  const user = new User({ ...userInfo });

  USERS_MAP.set(user.id, user);

  return user;
}

export function getUser(userId: User['id']): User | undefined {
  return USERS_MAP.get(userId);
}

export function getBaseUser(userId: User['id']): BaseUser | undefined {
  const user = getUser(userId);

  return user ? user.baseUser : undefined;
}

export function getUsers(): User[] {
  return Array.from(USERS_MAP.values());
}

export function getBaseUsers(): BaseUser[] {
  return getUsers().map((user) => user.baseUser);
}

export function deleteUser(userId: User['id']): void {
  USERS_MAP.delete(userId);
}
