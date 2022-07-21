import { body } from 'express-validator'

export const validateTypePrice = () => {
  return [
    body('name',
      'Имя типа цены (name) не указано')
      .notEmpty()
  ]
}
