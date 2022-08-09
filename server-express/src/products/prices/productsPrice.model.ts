import { Model } from 'objection'
import { dbKnex } from '@/db'

import Products from '../products.model'
import PricesTypes from './productsPriceType.model'

Model.knex(dbKnex)

export default class ProductsPriceModel extends Model {
  public id!: number
  public priceTypeId!: number
  public productId!: number
  public price!: number
  public currency!: string
  public createdAt!: Date | string
  public updatedAt!: Date | string

  productsPriceType?: PricesTypes
  products?: Products

  // innerJoin as
  public priceType!: string

  static get tableName () {
    return 'productsPrice'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        priceTypeId: { type: 'integer' },
        productId: { type: 'integer' },
        price: { type: 'number' },
        currency: { type: 'string', maxLength: 40, default: '₴' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' }
      }
    }
  }

  static get relationMappings () {
    return {
      priceType: {
        relation: Model.HasOneRelation,
        modelClass: PricesTypes,
        join: {
          from: this.tableName + '.priceTypeId',
          to: PricesTypes.tableName + '.id'
        }
      },
      product: {
        relation: Model.HasOneRelation,
        modelClass: Products,
        join: {
          from: this.tableName + '.productId',
          to: Products.tableName + '.id'
        }
      }
    }
  }

  $beforeInsert () {
    this.createdAt = new Date(Date.now())
  }

  $beforeUpdate () {
    this.updatedAt = new Date(Date.now())
  }
}
