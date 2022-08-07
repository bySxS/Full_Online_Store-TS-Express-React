import { Model } from 'objection'
import { dbKnex } from '@/db'

import Users from '../users.model'
Model.knex(dbKnex)

export default class TokenModel extends Model {
  public id!: number
  public userId!: number
  public ip!: string
  public fingerprint!: string
  public refreshToken!: string
  public createdAt!: Date | string
  public updatedAt!: Date | string

  user?: Users

  static get tableName () {
    return 'token'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      // required: ['userId', 'ip', 'fingerprint', 'refreshToken'],

      properties: {
        id: { type: 'integer' },
        userId: { type: 'integer' },
        ip: { type: 'string', minLength: 1, maxLength: 40 },
        fingerprint: { type: 'string', minLength: 1, maxLength: 1000 },
        refreshToken: { type: 'string', minLength: 1, maxLength: 255 },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' }
      }
    }
  }

  static get relationMappings () {
    return {
      users: {
        relation: Model.HasOneRelation,
        modelClass: Users,
        join: {
          from: this.tableName + '.userId',
          to: Users.tableName + '.id'
        }
      }
    }
  }

  $beforeInsert () {
    this.createdAt = new Date(Date.now())
  }

  $beforeUpdate () {
    this.updatedAt = new Date(Date.now())
  }
}
