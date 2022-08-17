export type ICharacteristicFieldType =
  'select' | 'checkbox' | 'text'

export interface ICharacteristicName {
  name: string
  categoryId: number
  fieldType?: ICharacteristicFieldType
  parentId?: number
}

export interface ICharacteristicValue {
  productId: number
  characteristicsNameId: number
  value: string
}

export interface ICharacteristicValueDelete {
  productId: number
  characteristicsValueId: number
}

export interface ICharacteristicValueUpdate {
  productId: number
  characteristicsValueId: number
  value: string
}

export interface ICharValue {
  characteristicValueId: number
  characteristicValue: string
  characteristicCountProducts: number
}

export interface ICharName {
  characteristicNameId: number
  characteristicName: string
  values: ICharValue[]
}

export interface ICharacteristicSection {
  sectionName: string
  sectionId: number
  characteristics: ICharName[]
}
