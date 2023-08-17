// eslint-disable-next-line import/no-anonymous-default-export
export default {
  translation: {
    signup: {
      username: {
        required: 'Обязательное поле',
        min: 'От 3 до 20 символов',
        max: 'От 3 до 20 символов',
      },
      password: {
        required: 'Обязательное поле',
        min: 'Не менее 6 символов',
        oneof: 'Пароли должны совпадать',
      },
    },
    modal: {
      required: 'Обязательное поле',
      min: 'От 3 до 20 символов',
      max: 'От 3 до 20 символов',
      notoneof: 'Должно быть уникальным',
    },
    toast: {
      createChannel: 'Канал создан',
      renameChannel: 'Канал переименован',
      removeChannel: 'Канал удалён',
      networkProblem: 'Ошибка соединения',
      duplicateUser: 'Такой пользователь уже существует',
    },
    siteName: 'HeXlet Chat',
    noPageSelected: 'No page is selected.',
    exit: 'Выйти',
    channels: 'Каналы',
    nameChannel: 'Имя канала',
    renameChannel: 'Переименовать канал',
    delete: 'Удалить',
    deleteChannel: 'Удалить канал',
    confirm: 'Уверены?',
    rename: 'Переименовать',
    send: 'Отправить',
    cancel: 'Отменить',
    enter: 'Войти',
    password: 'Пароль',
    yourNickname: 'Ваш ник',
    failedLogin: 'Неверные имя пользователя или пароль',
    invite: 'Нет аккаунта?',
    registration: 'Регистрация',
    username: 'Имя пользователя',
    passwordConfirm: 'Подтвердите пароль',
    addChannel: 'Добавить канал',
    menu: 'Управление каналом',
    pageNotFound: {
      msg1: 'Страница не найдена',
      msg2: 'Но вы можете перейти',
      msg3: 'на главную страницу',
    },
    messages: {
      counter: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
    },
  },
};
