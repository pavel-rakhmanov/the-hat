type Id = string;
type Word = string

export type BaseUser = {
  id: Id;
  name?: string;
  avatar?: string;
}

export type BaseRoom = BaseUser & {
  users: BaseUser[];
  readyUsersIds: BaseUser['id'][];
  usersLimit: number;
  password: string | null;
}

// export type Game = {
//   id: Id;
//   players: BaseUser[];
//   words: Word[];
//   timer: number | null;
// }

// export type Team = {
//   lastAskingUser: BaseUser;
//   userA: BaseUser;
//   userAGuessedWords: Word[];
//   userB: BaseUser;
//   userBGuessedWords: Word[];
// }
