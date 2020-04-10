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
  /**
   * ? ?
   */
  AddRoom = 'AddRoom',
  /**
   * Добавить в namespaces пользователя комнату
   */
  EnterRoom = 'EnterRoom',
  /**
   * Убрать из namespaces пользователя комнату
   */
  LeaveRoom = 'LeaveRoom',
}
