import { Model } from 'objection'
import { dbKnex } from '../db'

import BasketProducts from './basketProducts.model'
import Users from '../users/users.model'

Model.knex(dbKnex)

export default class BasketModel extends Model {
  public id!: number
  public user_id!: number
  public status!: string
  public comment!: string
  public delivery_address!: string
  public phone_number!: string
  public date_processing!: Date | string
  public delivery_date!: Date | string
  public created_at!: Date | string
  public updated_at!: Date | string

  basket_products?: BasketProducts[]
  users?: Users

  static get tableName () {
    return 'basket'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        status: { type: 'string', maxLength: 40 },
        comment: { type: 'string', maxLength: 1000 },
        delivery_address: { type: 'string', maxLength: 500 },
        phone_number: { type: 'string', maxLength: 25 },
        date_processing: { type: 'string' },
        delivery_date: { type: 'string' },
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
      basket_products: {
        relation: Model.BelongsToOneRelation,
        modelClass: BasketProducts,
        join: {
          from: this.tableName + '.id',
          to: BasketProducts.tableName + '.basket_id'
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
