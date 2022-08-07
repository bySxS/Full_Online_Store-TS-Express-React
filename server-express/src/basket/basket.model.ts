import { Model } from 'objection'
import { dbKnex } from '@/db'

import BasketProducts from './basketProducts.model'
import Users from '../users/users.model'

Model.knex(dbKnex)

export default class BasketModel extends Model {
  public id!: number
  public userId!: number
  public status!: string
  public fullName!: string
  public comment!: string
  public deliveryAddress!: string
  public phoneNumber!: string
  public dateProcessing!: Date | string
  public deliveryDate!: Date | string
  public createdAt!: Date | string
  public updatedAt!: Date | string

  basketProducts?: BasketProducts[]
  users?: Users

  static get tableName () {
    return 'basket'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        userId: { type: 'integer' },
        fullName: { type: 'string', maxLength: 100 },
        status: {
          type: 'string',
          enum: ['SelectsTheProduct', 'InProcessing',
            'InDelivery', 'Completed', 'Cancelled'],
          default: 'SelectsTheProduct',
          maxLength: 20
        },
        comment: { type: 'string', maxLength: 1000 },
        deliveryAddress: { type: 'string', maxLength: 500 },
        phoneNumber: { type: 'string', maxLength: 25 },
        dateProcessing: { type: 'string' },
        deliveryDate: { type: 'string' },
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
      basketProducts: {
        relation: Model.HasManyRelation,
        modelClass: BasketProducts,
        join: {
          from: this.tableName + '.id',
          to: BasketProducts.tableName + '.basketId'
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
