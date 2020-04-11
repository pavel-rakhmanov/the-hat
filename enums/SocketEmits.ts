export enum SocketEmits {
  /**
   * Связать id пользователя и id сокета по которому он сейчас подключен
   */
  BindUserId = 'BindUserId',
  /**
   * Список доступных комнат
   */
  Rooms = 'Rooms',
  /**
   * ? ?
   */
  Room = 'Room',
  AddRoom = 'AddRoom'
}
