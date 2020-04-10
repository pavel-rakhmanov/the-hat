export type BaseUser = {
  id: string;
  name?: string;
  avatar?: string;
}

export type Word = string

export type Team = {
  lastAskingUser: BaseUser;
  userA: BaseUser;
  userAGuessedWords: Word[];
  userB: BaseUser;
  userBGuessedWords: Word[];
}

export type Room = BaseUser & {
  users: BaseUser[];
  usersLimit: number;
}
