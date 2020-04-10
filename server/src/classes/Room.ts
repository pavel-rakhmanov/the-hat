import { Room as BaseRoom } from '@/types';
import { SocketEmits } from '@/enums';
import { User } from '@/classes';
import { getRoom, updateRooms } from '@/services/RoomsService';
import { uuidShort } from '@/utils';

export class Room implements BaseRoom {
  constructor(roomInfo: BaseRoom) {
    let roomId = uuidShort();

    while(getRoom(roomId)) {
      roomId = uuidShort();
    }

    this._baseRoom = {
      name: `room ${roomId}`,
      avatar: `public/img/default-avatar.png`,
      ...roomInfo,
      id: roomId
    }
  }

  private _baseRoom: BaseRoom;

  public get baseRoom() { return this._baseRoom; }
  public get id() { return this.baseRoom.id }
  public get name() { return this.baseRoom.name }
  public get avatar() { return this.baseRoom.avatar }
  public get users() { return this.baseRoom.users }
  public get usersLimit() { return this.baseRoom.usersLimit }

  private _backendUsers: User[] = [];
  private get backendUsers() { return this._backendUsers; };
  private set backendUsers(users) {
    this._backendUsers = users;
    this._baseRoom.users = users.map(user => user.baseUser)
  }

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
