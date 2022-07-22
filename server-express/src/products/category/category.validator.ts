import { body } from 'express-validator'

export const validateCategory = () => {
  return [
    body('name',
      'Название категории (name) не указано')
      .notEmpty(),
    body('nameEng',
      'Английское название категории (nameEng) не указано')
      .notEmpty()
  ]
}
