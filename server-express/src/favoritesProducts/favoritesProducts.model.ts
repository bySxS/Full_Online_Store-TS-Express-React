import { Model } from 'objection'
import { dbKnex } from '@/db'

import Users from '@/users/users.model'
import Products from '@/products/products.model'

Model.knex(dbKnex)

export default class FavoritesProductsModel extends Model {
  public id!: number
  public userId!: number
  public productId!: number
  public createdAt!: Date | string
  public updatedAt!: Date | string

  users?: Users
  products?: Products

  static get tableName () {
    return 'favoritesProducts'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        userId: { type: 'integer' },
        productId: { type: 'integer' },
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
