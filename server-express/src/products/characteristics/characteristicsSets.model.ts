import { Model } from 'objection'
import { dbKnex } from '../../db'

import Products from '../products.model'
import CharacteristicsValues from './characteristicsValues.model'

Model.knex(dbKnex)

export default class CharacteristicsSetsModel extends Model {
  public id!: number
  public product_id!: number
  public characteristics_values_id!: number
  public value!: string

  products?: Products
  characteristics_values?: CharacteristicsValues

  static get tableName () {
    return 'characteristics_sets'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        product_id: { type: 'integer' },
        characteristics_values_id: { type: 'integer' },
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
        modelClass: CharacteristicsValues,
        join: {
          from: this.tableName + '.characteristics_values_id',
          to: CharacteristicsValues.tableName + '.id'
        }
      },
    }
  }
}
