import { Model } from 'objection'
import { dbKnex } from '../../db'

import Products from '../products.model'

Model.knex(dbKnex)

export default class ProductsViewsModel extends Model {
  public id!: number
  public product_id!: number
  public views!: number

  products?: Products

  static get tableName () {
    return 'products_views'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        product_id: { type: 'integer' },
        views: { type: 'integer' }
      }
    }
  }

  static get relationMappings () {
    return {
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
}
