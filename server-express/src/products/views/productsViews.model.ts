import { Model } from 'objection'
import { dbKnex } from '@/db'

import Products from '../products.model'

Model.knex(dbKnex)

export default class ProductsViewsModel extends Model {
  public id!: number
  public productId!: number
  public views!: number

  products?: Products

  static get tableName () {
    return 'productsViews'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        productId: { type: 'integer' },
        views: { type: 'integer' }
      }
    }
  }

  static get relationMappings () {
    return {
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
}
