import { Model } from 'objection'
import { dbKnex } from '@/db'

import ProductsPrice from './productsPrice.model'
Model.knex(dbKnex)

export default class PricesTypesModel extends Model {
  public id!: number
  public name!: string
  public created_at!: Date | string
  public updated_at!: Date | string

  products_price?: ProductsPrice

  static get tableName () {
    return 'prices_types'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', maxLength: 100 },
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
      }
    }
  }

  static get relationMappings () {
    return {
      basket: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProductsPrice,
        join: {
          from: this.tableName + '.id',
          to: ProductsPrice.tableName + '.price_type_id'
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
