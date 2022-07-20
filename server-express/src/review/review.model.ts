import { Model } from 'objection'
import { dbKnex } from '@/db'

import Users from '../users/users.model'
import Products from '../products/products.model'

Model.knex(dbKnex)

export default class ReviewModel extends Model {
  public id!: number
  public product_id!: number
  public user_id!: number
  public comment!: string
  public advantages!: string
  public flaws!: string
  public bought!: boolean
  public rating!: number
  public parent_id!: number
  public created_at!: Date | string
  public updated_at!: Date | string

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
        product_id: { type: 'integer' },
        user_id: { type: 'integer' },
        comment: { type: 'string', minLength: 10, maxLength: 1000 },
        advantages: { type: 'string', maxLength: 1000 },
        flaws: { type: 'string', maxLength: 1000 },
        bought: { type: 'boolean' },
        rating: { type: 'integer' },
        parent_id: { type: 'integer' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
      }
    }
  }

  static get relationMappings () {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: this.tableName + '.user_id',
          to: Users.tableName + '.id'
        }
      },
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Products,
        join: {
          from: this.tableName + '.product_id',
          to: Products.tableName + '.id'
        }
      },
      parent: {
        relation: Model.BelongsToOneRelation,
        modelClass: this,
        join: {
          from: this.tableName + '.parent_id',
          to: this.tableName + '.id'
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
