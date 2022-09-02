export type ICharacteristicFieldType =
  'select' | 'checkbox' | 'text' | '' | undefined

export interface ICharacteristicName {
  id?: number
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
  characteristicsFieldType: ICharacteristicFieldType
  values?: ICharValue[]
}

export interface ICharacteristicSection {
  sectionName: string
  sectionId: number
  characteristics: ICharName[]
}

export interface ICharNameList {
  propertyNameId?: number
  propertyName?: string
  propertyCountProducts?: number
  propertyValueId?: number
  propertyValue: string
  propertyFieldType?: string
  sectionId?: number
  sectionName?: string
}
