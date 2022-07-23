import { body } from 'express-validator'

export const validateLogin = () => {
  return [
    body('name',
      'Имя группы (name) не может быть пустым')
      .notEmpty(),
    body('nameEng',
      'Имя группы на английском (nameEng) не может быть пустым')
      .notEmpty()
  ]
}