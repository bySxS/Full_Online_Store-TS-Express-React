import { body } from 'express-validator'

export const validateBasket = () => {
  return [
    body('userId', 'ID пользователя (userId) не указан')
      .notEmpty(),
    body('userId', 'ID пользователя (userId) должны быть только цифры')
      .matches('^[a-zA-Z0-9]+$')
  ]
}

export const validateBasketProduct = () => {
  return [
    body('productId', 'Продукт (productId) не указан')
      .notEmpty(),
    body('productId', 'ID пользователя (productId) должны быть только цифры')
      .matches('^[a-zA-Z0-9]+$'),
    body('productCount', 'Количество продукта (productCount) не указано')
      .notEmpty(),
    body('productCount', 'Количество продукта (productCount) должны быть только цифры')
      .matches('^[a-zA-Z0-9]+$')
  ]
}
