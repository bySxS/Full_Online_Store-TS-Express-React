import { body } from 'express-validator'

export const validateTypePrice = () => {
  return [
    body('name',
      'Имя типа цены (name) не указано')
      .notEmpty()
  ]
}

export const validateProductPrice = () => {
  return [
    body('priceTypeId',
      'ID тип цены (priceTypeId) не указано')
      .notEmpty(),
    body('priceTypeId',
      'ID тип цены (priceTypeId) должны быть только цифры')
      .matches('^[a-zA-Z0-9]+$'),
    body('productId',
      'ID продукта (productId) не указано')
      .notEmpty(),
    body('productId',
      'ID продукта (productId) должны быть только цифры')
      .matches('^[a-zA-Z0-9]+$'),
    body('price',
      'Новая цена продукта (price) не указана, также можно указать валюту (currency)')
      .notEmpty(),
    body('price',
      'Новая цена продукта (price) должны быть только цифры')
      .matches('^[a-zA-Z0-9]+$')
  ]
}
