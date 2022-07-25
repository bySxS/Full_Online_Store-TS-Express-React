import { Model } from 'objection'
import { dbKnex } from '@/db'

import Products from '@/products/products.model'

Model.knex(dbKnex)

/// ///CategoryNewsModel
export default class CategoryModel extends Model {
  public id!: number
  public name!: string
  public nameEng!: string
  public parentId!: number

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
        nameEng: { type: 'string', minLength: 1, maxLength: 50 },
        parentId: { type: 'integer' }
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
          to: Products.tableName + '.categoryId'
        }
      },
      parent: {
        relation: Model.BelongsToOneRelation,
        modelClass: this,
        join: {
          from: this.tableName + '.parentId',
          to: this.tableName + '.id'
        }
      }
    }
  }
}
