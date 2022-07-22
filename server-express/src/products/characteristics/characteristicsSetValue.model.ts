import { Model } from 'objection'
import { dbKnex } from '@/db'

import Products from '../products.model'
import CharacteristicsName from './characteristicsName.model'

Model.knex(dbKnex)

export default class CharacteristicsSetValueModel extends Model {
  public id!: number
  public product_id!: number
  public characteristics_name_id!: number
  public value!: string

  products?: Products
  characteristics_name?: CharacteristicsName

  static get tableName () {
    return 'characteristics_set_value'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        product_id: { type: 'integer' },
        characteristics_name_id: { type: 'integer' },
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
          from: this.tableName + '.product_id',
          to: Products.tableName + '.id'
        }
      },
      valueCharacteristics: {
        relation: Model.BelongsToOneRelation,
        modelClass: CharacteristicsName,
        join: {
          from: this.tableName + '.characteristics_name_id',
          to: CharacteristicsName.tableName + '.id'
        }
      },
    }
  }
}
