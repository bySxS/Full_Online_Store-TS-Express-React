import { Model } from 'objection'
import { dbKnex } from '@/db'

import Products from '@/products/products.model'
import CharacteristicsName from '@/characteristics/characteristicsName.model'

Model.knex(dbKnex)

export default class CharacteristicsSetValueModel extends Model {
  public id!: number
  public productId!: number
  public characteristicsNameId!: number
  public value!: string

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
        value: { type: 'string', maxLength: 100 }
      }
    }
  }

  static get relationMappings () {
    return {
      products: {
        relation: Model.BelongsToOneRelation,
        modelClass: Products,
        join: {
          from: this.tableName + '.productId',
          to: Products.tableName + '.id'
        }
      },
      valueCharacteristics: {
        relation: Model.BelongsToOneRelation,
        modelClass: CharacteristicsName,
        join: {
          from: this.tableName + '.characteristicsNameId',
          to: CharacteristicsName.tableName + '.id'
        }
      },
    }
  }
}
