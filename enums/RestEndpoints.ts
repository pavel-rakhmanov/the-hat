export enum RestEndpoints {
  /**
   * Создаст нового пользователя в системе буквально из ничего
   * или с именем и/или аватаркой, переданными с фронта
   */
  SignUp = 'sing-up',
  /**
   * По Id пользователя с фронта попробует найти пользователя
   * на сервере и вернуть его
   */
  SignIn = 'sign-in',
  /**
   * Сохраняет переданное с фронта изображение в папку `img/`
   * Возвращает путь изображения относительно base url
   */
  UploadImage = 'upload-image',
  /**
   * Возвращает объект пользователя со случайно заполненными полями
   */
  GenerateRandomUser = 'generate-random-user',
  /**
   * Возвращает список случайных слов указанной длинны
   */
  GenerateRandomWords = 'generate-random-words',
  /**
   * Добавить в namespaces пользователя комнату
   */
  EnterRoom = 'enter-room',
  /**
   * Убрать из namespaces пользователя комнату
   */
  LeaveRoom = 'leave-room',
  /**
   *
   */
  MarkUserAsReady = 'mark-user-as-ready',
  /**
   *
   */
  UnmarkUserAsReady = 'unmark-user-as-ready',
}
