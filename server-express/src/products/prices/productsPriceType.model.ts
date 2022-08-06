import { Model } from 'objection'
import { dbKnex } from '@/db'

import ProductsPrice from './productsPrice.model'
import Products from '@/products/products.model'
Model.knex(dbKnex)

export default class ProductsPriceTypeModel extends Model {
  public id!: number
  public name!: string
  public createdAt!: Date | string
  public updatedAt!: Date | string

  productsPrice?: ProductsPrice

  static get tableName () {
    return 'productsPriceType'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', maxLength: 100 },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' }
      }
    }
  }

  static get relationMappings () {
    return {
      price: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProductsPrice,
        join: {
          from: this.tableName + '.id',
          to: ProductsPrice.tableName + '.priceTypeId'
        }
      },
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Products,
        join: {
          from: this.tableName + '.id',
          to: Products.tableName + '.priceTypeId'
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
