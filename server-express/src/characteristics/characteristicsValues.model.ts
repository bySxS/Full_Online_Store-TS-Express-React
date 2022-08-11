import { Model } from 'objection'
import { dbKnex } from '@/db'

import CharacteristicsSetValue from '@/characteristics/characteristicsSetValue.model'

Model.knex(dbKnex)

export default class CharacteristicsValuesModel extends Model {
  public id!: number
  public value!: string

  static get tableName () {
    return 'characteristicsValues'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        value: { type: 'string', maxLength: 150 }
      }
    }
  }

  static get relationMappings () {
    return {
      characteristicsSetValue: {
        relation: Model.HasManyRelation,
        modelClass: CharacteristicsSetValue,
        join: {
          from: this.tableName + '.id',
          to: CharacteristicsSetValue.tableName +
            '.characteristicsValueId'
        }
      }
    }
  }
}
