type Id = string;
type Word = string

export type BaseUser = {
  id: Id;
  name?: string;
  avatar?: string;
}

export type BaseRoom = BaseUser & {
  users: BaseUser[];
  usersLimit: number;
  password: string | null;
}

export type Game = {
  id: Id;
}

export type Team = {
  lastAskingUser: BaseUser;
  userA: BaseUser;
  userAGuessedWords: Word[];
  userB: BaseUser;
  userBGuessedWords: Word[];
}

