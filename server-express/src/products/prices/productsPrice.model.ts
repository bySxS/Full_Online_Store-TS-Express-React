import { Model } from 'objection'
import { dbKnex } from '@/db'

import Products from '../products.model'
import PricesTypes from './pricesTypes.model'

Model.knex(dbKnex)

export default class ProductsPriceModel extends Model {
  public id!: number
  public price_type_id!: number
  public product_id!: number
  public price!: number
  public currency!: string
  public created_at!: Date | string
  public updated_at!: Date | string

  prices_types?: PricesTypes
  products?: Products

  static get tableName () {
    return 'products_price'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        price_type_id: { type: 'integer' },
        product_id: { type: 'integer' },
        price: { type: 'number' },
        currency: { type: 'string', maxLength: 40 },
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
      }
    }
  }

  static get relationMappings () {
    return {
      price_type: {
        relation: Model.BelongsToOneRelation,
        modelClass: PricesTypes,
        join: {
          from: this.tableName + '.price_type_id',
          to: PricesTypes.tableName + '.id'
        }
      },
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Products,
        join: {
          from: this.tableName + '.product_id',
          to: Products.tableName + '.id'
        }
      }
    }
  }

  $beforeInsert () {
    this.created_at = new Date(Date.now())
  }

  $beforeUpdate () {
    this.updated_at = new Date(Date.now())
  }
}
