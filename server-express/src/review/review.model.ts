import { Model } from 'objection'
import { dbKnex } from '@/db'

import Users from '../users/users.model'
import Products from '../products/products.model'

Model.knex(dbKnex)

export default class ReviewModel extends Model {
  public id!: number
  public productId!: number
  public userId!: number
  public comment!: string
  public advantages!: string
  public flaws!: string
  public bought!: boolean
  public rating!: number
  public parentId!: number
  public createdAt!: Date | string
  public updatedAt!: Date | string

  users?: Users
  products?: Products

  static get tableName () {
    return 'review'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        productId: { type: 'integer' },
        userId: { type: 'integer' },
        comment: { type: 'string', minLength: 10, maxLength: 1000 },
        advantages: { type: 'string', maxLength: 1000 },
        flaws: { type: 'string', maxLength: 1000 },
        bought: { type: 'boolean' },
        rating: { type: 'integer' },
        parentId: { type: 'integer' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' }
      }
    }
  }

  static get relationMappings () {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: Users,
        join: {
          from: this.tableName + '.userId',
          to: Users.tableName + '.id'
        }
      },
      product: {
        relation: Model.HasOneRelation,
        modelClass: Products,
        join: {
          from: this.tableName + '.productId',
          to: Products.tableName + '.id'
        }
      },
      parent: {
        relation: Model.HasOneRelation,
        modelClass: this,
        join: {
          from: this.tableName + '.parentId',
          to: this.tableName + '.id'
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
