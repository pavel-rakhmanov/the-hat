import { Room as BaseRoom } from '@/types';
import { SocketEmits } from '@/enums';
import { User } from '@/classes';
import { getRoom, updateRooms } from '@/services/RoomsService';
import { uuidShort } from '@/utils';

export class Room implements BaseRoom {
  constructor(roomInfo: Omit<BaseRoom, 'id' | 'users'>) {
    let roomId = uuidShort();

    while(getRoom(roomId)) {
      roomId = uuidShort();
    }

    this.id = roomId;
    this.name = roomInfo.name || `room ${roomId}`;
    this.avatar = roomInfo.avatar || `public/img/default-avatar.png`;
    this.usersLimit = roomInfo.usersLimit;
  }

  public readonly id: NonNullable<BaseRoom['id']>;

  public readonly name: NonNullable<BaseRoom['name']>;

  public readonly avatar: NonNullable<BaseRoom['avatar']>;

  public readonly usersLimit : NonNullable<BaseRoom['usersLimit']>;

  public get users(): BaseRoom['users'] {
    return this.backendUsers.map(user => user.baseUser);
  }

  public get baseRoom(): BaseRoom {
    return {
      id: this.id,
      name: this.name,
      avatar: this.avatar,
      users: this.users,
      usersLimit: this.usersLimit
    };
  }

  private backendUsers: User[] = [];

  public addUser(user: User) {
    if (this.backendUsers.length >= this.usersLimit) return;

    this.backendUsers = [...this.backendUsers, user];
    user.socket?.join(this.id);
    this.update();

    console.log(`User with id='${user.id}' enter to the room with id='${this.id}'`);
  }

  public removeUser(user: User) {
    this.backendUsers = this.backendUsers.filter(({ id }) => id !== user.id);
    user.socket?.leave(this.id);
    this.update();

    console.log(`User with id='${user.id}' leaving the room with id='${this.id}'`);
  }

  private update() {
    // this.updateRoom();
    this.updateRooms();
  }
  private updateRoom() {
    this.backendUsers.forEach(user => {
      user.socket?.in(this.id).emit(SocketEmits.Room, this.baseRoom);
    })
  }

  private updateRooms() {
    updateRooms()
  }
}
