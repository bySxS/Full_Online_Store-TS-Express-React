import { body } from 'express-validator'

export const validateProduct = () => {
  return [
    body('title',
      'Имя продукта (title) не указано')
      .notEmpty(),
    body('categoryId', 'Категория (categoryId) не указана')
      .notEmpty(),
    body('categoryId', 'Категория (categoryId) должны быть только цифры')
      .matches('^[a-zA-Z0-9]+$'),
    body('description', 'Описание (description) не указано')
      .notEmpty(),
    body('count', 'Количество (count) товара не указано')
      .notEmpty(),
    body('count', 'Количество (count) должны быть только цифры')
      .matches('^[a-zA-Z0-9]+$'),
    body('price', 'Цена (price) товара не указано')
      .notEmpty(),
    body('price', 'Цена (price) должны быть только цифры')
      .matches('^[a-zA-Z0-9]+$'),
    body('availability', 'В наличии товар или нет (availability) не указано')
      .notEmpty(),
    body('availability', 'В наличии товар (availability) доступные значения true, false')
      .isBoolean(),
    body('url', 'URL (url) не указан, ПРИМЕР url: smartphone_xiaomi_poco_x4')
      .notEmpty()
  ]
}

export const validateProductUpd = () => {
  return [
    body('priceTypeId',
      'Id тип цены (priceTypeId) не указано, основной тип 1')
      .notEmpty()
  ]
}
