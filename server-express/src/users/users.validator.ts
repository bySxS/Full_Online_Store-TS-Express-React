import { body, param } from 'express-validator'

export const validateRegistration = () => {
  return [
    body('nickname',
      'Имя пользователя (nickname) не может быть пустым')
      .notEmpty(),
    body('email',
      'E-mail (email) не указан')
      .notEmpty(),
    body('email',
      'Некорректный адрес e-mail (email)')
      .isEmail({}),
    body('password',
      'password (password) не указан')
      .notEmpty(),
    body('password',
      'Длина пароля должена быть от 5 до 20 символов')
      .isLength({
        min: 5,
        max: 20
      }),
    body('password', 'Пароль должен быть на латинице с цифрами')
      .matches('^[a-zA-Z0-9]+$')
  ]
}

export const validateLogin = () => {
  return [
    body('nickname',
      'Имя пользователя не может быть пустым')
      .notEmpty(),
    body('password',
      'Пароль не может быть пустым')
      .notEmpty()
  ]
}

export const validateLink = () => {
  return [
    param('link',
      'Параметр "link" не может быть пустым')
      .notEmpty()
  ]
}
