import { Model } from 'objection'
import { dbKnex } from '@/db'

import Products from '@/products/products.model'
import CharacteristicsName from '@/characteristics/characteristicsName.model'
import CharacteristicsValues from '@/characteristics/characteristicsValues.model'

Model.knex(dbKnex)

export default class CharacteristicsSetValueModel extends Model {
  public id!: number
  public productId!: number
  public characteristicsNameId!: number
  public characteristicsValueId!: number

  products?: Products
  characteristicsName?: CharacteristicsName

  static get tableName () {
    return 'characteristicsSetValue'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        productId: { type: 'integer' },
        characteristicsNameId: { type: 'integer' },
        characteristicsValueId: { type: 'integer' }
      }
    }
  }

  static get relationMappings () {
    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: Products,
        join: {
          from: this.tableName + '.productId',
          to: Products.tableName + '.id'
        }
      },
      characteristicsName: {
        relation: Model.HasManyRelation,
        modelClass: CharacteristicsName,
        join: {
          from: this.tableName + '.characteristicsNameId',
          to: CharacteristicsName.tableName + '.id'
        }
      },
      characteristicsValues: {
        relation: Model.HasManyRelation,
        modelClass: CharacteristicsValues,
        join: {
          from: this.tableName + '.characteristicsValueId',
          to: CharacteristicsValues.tableName + '.id'
        }
      }
    }
  }
}
