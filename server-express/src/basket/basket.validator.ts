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
    body('status', 'Указанный статус (status) не соответствет \'Completed\', \'InDelivery\', \'Cancelled\', \'InProcessing\'')
      .isIn(['InProcessing', 'InDelivery', 'Completed', 'Cancelled']),
    body('comment', 'При отмене заказа нужно написать причину (comment)')
      .if(body('status').isIn(['Cancelled']))
      .notEmpty(),
    body('deliveryDate', 'Укажите примерную дату доставки (deliveryDate) в формате \'2022-05-24 15:00\'')
      .if(body('status').isIn(['InDelivery']))
      .notEmpty()
  ]
}

export const validateBasketProduct = () => {
  return [
    body('productId', 'ID продукта (productId) не указан')
      .notEmpty(),
    body('productId', 'ID продукта (productId) должны быть только цифры')
      .matches('^[a-zA-Z0-9]+$'),
    body('productCount', 'Количество продукта (productCount) не указано')
      .notEmpty(),
    body('productCount', 'Количество продукта (productCount) должны быть только цифры')
      .matches('^[a-zA-Z0-9]+$')
  ]
}
