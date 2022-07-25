import { Model } from 'objection'
import { dbKnex } from '@/db'

import Users from '../users.model'
Model.knex(dbKnex)

export default class RolesModel extends Model {
  public id!: number
  public name!: string
  public nameEng!: string

  users?: Users[]

  static get tableName () {
    return 'roles'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 40 },
        nameEng: { type: 'string', minLength: 1, maxLength: 40 }
      }
    }
  }

  static get relationMappings () {
    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: Users,
        join: {
          from: this.tableName + '.id',
          to: Users.tableName + '.rolesId'
        }
      }
    }
  }
}
