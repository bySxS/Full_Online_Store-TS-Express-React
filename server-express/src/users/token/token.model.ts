import { Model } from 'objection'
import { dbKnex } from '../../db'

import Users from '../users.model'
Model.knex(dbKnex)

export default class TokenModel extends Model {
  public id!: number
  public user_id!: number
  public ip!: string
  public fingerprint!: string
  public refreshToken!: string
  public created_at!: Date | string
  public updated_at!: Date | string

  user?: Users

  static get tableName () {
    return 'token'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      // required: ['user_id', 'ip', 'fingerprint', 'refreshToken'],

      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        ip: { type: 'string', minLength: 1, maxLength: 40 },
        fingerprint: { type: 'string', minLength: 1, maxLength: 1000 },
        refreshToken: { type: 'string', minLength: 1, maxLength: 255 },
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
      }
    }
  }

  static get relationMappings () {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: this.tableName + '.user_id',
          to: Users.tableName + '.id'
        }
      }
    }
  }

  $beforeInsert () {
    this.created_at = new Date(Date.now())
  }

  $beforeUpdate () {
    this.updated_at = new Date(Date.now())
  }
}
