export type User = {
  id: string
  name?: string
  roomId?: Room['id']
}

export type Word = string

export type Team = {
  lastAskingUser: User
  userA: User
  userAGuessedWords: Word[]
  userB: User
  userBGuessedWords: Word[]
} 

export type Room = User & {
  users: User[]
  teams: Team[]
  words: Word[]
} & {
  usersLimit: number
  timePerRound: number
}