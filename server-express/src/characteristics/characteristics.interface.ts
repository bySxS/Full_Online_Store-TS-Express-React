import { IMessage } from '@/interface'
import { NextFunction, Request, Response } from 'express'
import { QueryBuilder } from 'objection'
import CharacteristicsSetValueModel from '@/characteristics/characteristicsSetValue.model'
import CharacteristicsNameModel from '@/characteristics/characteristicsName.model'

export interface ICharacteristicName {
  id?: number
  categoryId: number
  name: string
  fieldType?: string
  parentId?: number
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

export interface ICharacteristicSetValue {
  id?: number
  productId: number
  value: string
  characteristicsNameId: number
}

export interface ICharacteristicValue {
  characteristicValueId: number
  characteristicValue: string
  characteristicCountProducts: number
}

export interface ICharacteristic {
  characteristicNameId: number
  characteristicName: string
  characteristicsFieldType: string
  values?: ICharacteristicValue[]
}

export interface ICharacteristicProduct {
  sectionName: string
  sectionId: number
  characteristics: ICharacteristic[]
}

export interface ICharacteristicService {
  addCharacteristicName: (Dto: ICharacteristicName) => Promise<IMessage>
  updCharacteristicName: (id: number, Dto: ICharacteristicName) => Promise<IMessage>
  delCharacteristicName: (id: number) => Promise<IMessage>

  addCharacteristicValueProduct: (Dto: ICharacteristicSetValue) => Promise<IMessage>
  updCharacteristicValueProduct: (Dto: ICharacteristicValueUpdate) => Promise<IMessage>
  delCharacteristicValueProduct: (Dto: ICharacteristicValueDelete) => Promise<IMessage>
  getCharacteristicValueProductById: (id: number) => Promise<IMessage>
  getAllCharacteristics: ({ sectionId }: { sectionId?: number }) => Promise<IMessage>
  getAllCharacteristicsNameByCategoryId: ({ categoryId, sort, alsoParents }: {
    categoryId: number, sort: boolean, alsoParents?: boolean
  }) => Promise<IMessage>

  getCharacteristicValue: () =>
    QueryBuilder<CharacteristicsSetValueModel, CharacteristicsSetValueModel[]>
  // getCharacteristicName: () =>
  //   QueryBuilder<CharacteristicsNameModel, CharacteristicsNameModel[]>
  sortCharacteristicsTree: (
    characteristics: CharacteristicsSetValueModel[] | CharacteristicsNameModel[]
  ) => ICharacteristicProduct[]
  getCharacteristicValueByNameId: ({
    characteristicsNameId
  }: { characteristicsNameId: number }) => Promise<IMessage>
}

export interface ICharacteristicController {
  addCharacteristicName: (req: Request, res: Response, next: NextFunction) => void
  updCharacteristicNameById: (req: Request, res: Response, next: NextFunction) => void
  delCharacteristicNameById: (req: Request, res: Response, next: NextFunction) => void

  addCharacteristicValueProduct: (req: Request, res: Response, next: NextFunction) => void
  updCharacteristicValueProductById: (req: Request, res: Response, next: NextFunction) => void
  delCharacteristicValueProductById: (req: Request, res: Response, next: NextFunction) => void
  getCharacteristicValueProductById: (req: Request, res: Response, next: NextFunction) => void
  getAllCharacteristics: (req: Request, res: Response, next: NextFunction) => void
  getAllCharacteristicsNameByCategoryId: (req: Request, res: Response, next: NextFunction) => void
  getCharacteristicValueByNameId: (req: Request, res: Response, next: NextFunction) => void
}
