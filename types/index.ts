export type User = {
  id: string
  name?: string
  avatar?: string
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
  usersLimit: number
}