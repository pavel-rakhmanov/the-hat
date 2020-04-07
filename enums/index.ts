export enum RestEndpoints {
  UploadImage = 'upload-image'
}

export enum SocketEmits {
  User = 'user',
  Rooms = 'rooms',
  AddRoom = 'addRoom',
  EnterRoom = 'enterRoom',
  LeaveRoom = 'leaveRoom',
  Room = 'room',
}

export enum SocketNamespace {
  Rooms = 'rooms',
  Room = 'room-'
}