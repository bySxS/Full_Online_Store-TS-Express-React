import { Model } from 'objection'
import { dbKnex } from '@/db'

import Products from '../products.model'

Model.knex(dbKnex)

/// ///CategoryNewsModel
export default class CategoryModel extends Model {
  public id!: number
  public name!: string
  public name_eng!: string
  public parent_id!: number

  products?: Products[]

  static get tableName () {
    return 'category'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 50 },
        name_eng: { type: 'string', minLength: 1, maxLength: 50 },
        parent_id: { type: 'integer' }
      }
    }
  }

  static get relationMappings () {
    return {
      products: {
        relation: Model.BelongsToOneRelation,
        modelClass: Products,
        join: {
          from: this.tableName + '.id',
          to: Products.tableName + '.category_id'
        }
      },
      parent: {
        relation: Model.BelongsToOneRelation,
        modelClass: this,
        join: {
          from: this.tableName + '.parent_id',
          to: this.tableName + '.id'
        }
      }
    }
  }
}
