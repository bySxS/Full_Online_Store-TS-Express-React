import { body } from 'express-validator'

export const validateReview = () => {
  return [
    body('comment', 'Комментарий (comment) не может быть пустым')
      .notEmpty(),
    body('comment', 'Комментарий (comment) должен быть минимум 10 символов')
      .isLength({ min: 10 }),
    body('productId', 'Продукт (productId) не указан')
      .notEmpty(),
    body('rating', 'Рейтинг (rating) должен быть от 1 до 5')
      .if(body('rating').notEmpty())
      .isIn([0, 1, 2, 3, 4, 5])
  ]
}

export const validateUpdRating = () => {
  return [
    body('comment', 'Комментарий (comment) не может быть пустым')
      .notEmpty(),
    body('comment', 'Комментарий (comment) должен быть минимум 10 символов')
      .isLength({ min: 10 }),
    body('productId', 'Продукт (productId) не указан')
      .notEmpty(),
    body('rating', 'Рейтинг (rating) не указан')
      .notEmpty(),
    body('rating', 'Рейтинг (rating) должен быть от 1 до 5')
      .isIn([1, 2, 3, 4, 5])
  ]
}
