import { check, param, query } from 'express-validator'

export const validateId = () => {
  return [
    param('id', 'параметр Id должны быть только цифры')
      .matches('^[0-9]+$'),
    check('id', 'Id должны быть только цифры')
      .matches('^[0-9]+$')
  ]
}

export const validateLimitPage = () => {
  return [
    query('limit', 'параметр limit должны быть только цифры')
      .matches('^[0-9]+$'),
    query('page', 'параметр page должны быть только цифры')
      .matches('^[0-9]+$')
  ]
}

export const validateSearch = () => {
  return [
    query('value', 'параметр value должнен быть не пустой')
      .notEmpty()
  ]
}
