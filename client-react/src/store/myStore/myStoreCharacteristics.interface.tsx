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

export interface ICharacteristic {
  characteristicNameId: number
  characteristicName: string
  characteristicValueId: number
  characteristicValue: string
}

export interface ICharacteristicSection {
  sectionName: string
  sectionId: number
  characteristics: ICharacteristic[]
}
