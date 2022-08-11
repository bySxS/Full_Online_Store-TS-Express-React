import { Model } from 'objection'
import { dbKnex } from '@/db'

import Category from '@/category/category.model'
import CharacteristicsSetValue from './characteristicsSetValue.model'

Model.knex(dbKnex)

export default class CharacteristicsNameModel extends Model {
  public id!: number
  public categoryId!: number
  public name!: string
  public fieldType!: string
  public parentId!: number

  static get tableName () {
    return 'characteristicsName'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        categoryId: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 150 },
        fieldType: { type: 'string', maxLength: 100 },
        parentId: { type: 'integer' }
      }
    }
  }

  static get relationMappings () {
    return {
      category: {
        relation: Model.HasOneRelation,
        modelClass: Category,
        join: {
          from: this.tableName + '.categoryId',
          to: Category.tableName + '.id'
        }
      },
      parent: {
        relation: Model.HasOneRelation,
        modelClass: this,
        join: {
          from: this.tableName + '.parentId',
          to: this.tableName + '.id'
        }
      },
      characteristicsSetValue: {
        relation: Model.HasManyRelation,
        modelClass: CharacteristicsSetValue,
        join: {
          from: this.tableName + '.id',
          to: CharacteristicsSetValue.tableName + '.characteristicsNameId'
        }
      }
    }
  }
}
