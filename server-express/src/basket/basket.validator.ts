import { body } from 'express-validator'

export const validateBasket = () => {
  return [
    body('fullName', 'ФИО получателя (fullName) не указано')
      .notEmpty(),
    body('deliveryAddress', 'Адрес доставки (deliveryAddress) не указан')
      .notEmpty(),
    body('phoneNumber', 'Номер толефона (phoneNumber) не указан')
      .notEmpty()
  ]
}

export const validateUpdBasket = () => {
  return [
    body('status', 'Статус (status) не указан')
      .notEmpty(),
    body('status', 'Указанный статус (status) не соответствет \'Completed\', \'Cancelled\', \'In processing\'')
      .isIn(['Completed', 'Cancelled', 'In processing']),
    body('comment', 'При отмене заказа нужно написать причину (comment)')
      .if(body('status').isIn(['Cancelled']))
      .notEmpty()
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
