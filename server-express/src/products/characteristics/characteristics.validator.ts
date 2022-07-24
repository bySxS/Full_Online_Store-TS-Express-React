import { body } from 'express-validator'

export const validateCharacteristicSetValue = () => {
  return [
    body('value',
      'Значение характеристики (value) не указано')
      .notEmpty(),
    body('productId', 'ID продукта (productId) не указано')
      .notEmpty(),
    body('productId', 'ID продукта (productId) должны быть только цифры')
      .matches('^[a-zA-Z0-9]+$'),
    body('characteristicsNameId', 'ID названия характеристики (characteristicsNameId) не указано')
      .notEmpty(),
    body('characteristicsNameId', 'ID названия характеристики (characteristicsNameId) должны быть только цифры')
      .matches('^[a-zA-Z0-9]+$'),
  ]
}

export const validateCharacteristicAddName = () => {
  return [
    body('name',
      'Название характеристики (name) не указано')
      .notEmpty(),
    body('categoryId', 'ID категории (categoryId) не указано')
      .notEmpty(),
    body('categoryId', 'ID категории (categoryId) должны быть только цифры')
      .matches('^[a-zA-Z0-9]+$'),
    body('fieldType', 'Поле типа (fieldType) не указано, например: select, checkbox, text')
      .notEmpty()
  ]
}