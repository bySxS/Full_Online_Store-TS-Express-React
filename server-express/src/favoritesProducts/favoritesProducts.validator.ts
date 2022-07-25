import { body } from 'express-validator'

export const validateFavoriteProduct = () => {
  return [
    body('productId', 'ID продукта (productId) не указан')
      .notEmpty(),
    body('productId', 'ID продукта (productId) должны быть только цифры')
      .matches('^[a-zA-Z0-9]+$')
  ]
}
