import { Model } from 'objection'
import { dbKnex } from '@/db'

import Category from '../category/category.model'

Model.knex(dbKnex)

export default class CharacteristicsNameModel extends Model {
  public id!: number
  public category_id!: number
  public name!: string
  public field_type!: string
  public parent_id!: number

  category?: Category

  static get tableName () {
    return 'characteristics_name'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        category_id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 150 },
        field_type: { type: 'string', maxLength: 100 },
        parent_id: { type: 'integer' }
      }
    }
  }

  static get relationMappings () {
    return {
      products: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: this.tableName + '.category_id',
          to: Category.tableName + '.id'
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
