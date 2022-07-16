import { check, body, param } from 'express-validator'

export const validateRegistration = () => {
  return [
    body('nickname',
      'Имя пользователя не может быть пустым')
      .notEmpty(),
    body('email', 'Некорректный адрес email')
      .isEmail({}),
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
export const validateId = () => {
  return [
    check('id',
      'Id не цифры')
      .matches('^[0-9]+$')
  ]
}
