import { check, query } from 'express-validator'

export const validateId = () => {
  return [
    check('id', 'Id должны быть только цифры')
      .matches('^[0-9]+$')
  ]
}

export const validateFilter = () => {
  return [
    query('filter', 'параметр filter должнен быть не пустой')
      .notEmpty()
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
