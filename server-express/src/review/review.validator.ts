import { body, param, query } from 'express-validator'

export const validateReview = () => {
  return [
    body('comment', 'Комментарий (comment) не может быть пустым')
      .notEmpty(),
    body('comment', 'Комментарий (comment) должен быть минимум 10 символов')
      .isLength({ min: 10 }),
    body('productId', 'Продукт (productId) не указан')
      .notEmpty()
  ]
}
