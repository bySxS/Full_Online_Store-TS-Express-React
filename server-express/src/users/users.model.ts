import { Model } from 'objection'
import { dbKnex } from '@/db'

import Roles from './roles/roles.model'
import Token from './token/token.model'
import Products from '@/products/products.model'
import FavoritesProducts from '@/favoritesProducts/favoritesProducts.model'
Model.knex(dbKnex)

export default class UsersModel extends Model {
  public id!: number
  public nickname!: string
  public fullName!: string
  public city!: string
  public address!: string
  public deliveryAddress!: string
  public phoneNumber!: string
  public rolesId!: number
  public email!: string
  public password!: string
  public isActivated!: boolean
  public isSubscribeToNews!: boolean
  public avatar!: string
  public activateLink!: string
  public registrationIp!: string
  public createdAt!: Date | string
  public updatedAt!: Date | string

  roles?: Roles[]
  token?: Token
  products?: Products
  favoritesProducts?: FavoritesProducts

  static get tableName () {
    return 'users'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        nickname: { type: 'string', minLength: 1, maxLength: 40 },
        fullName: { type: 'string', minLength: 1, maxLength: 100 },
        city: { type: 'string', minLength: 1, maxLength: 100 },
        address: { type: 'string', minLength: 1, maxLength: 1000 },
        deliveryAddress: { type: 'string', minLength: 1, maxLength: 255 },
        phoneNumber: { type: 'string', minLength: 1, maxLength: 20 },
        rolesId: { type: 'integer' },
        email: { type: 'string', minLength: 1, maxLength: 100 },
        password: { type: 'string', minLength: 1, maxLength: 200 },
        isActivated: { type: 'boolean' },
        isSubscribeToNews: { type: 'boolean' },
        avatar: { type: 'string' },
        activateLink: { type: 'string', minLength: 0, maxLength: 100 },
        registrationIp: { type: 'string', minLength: 1, maxLength: 100 },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' }
      }
    }
  }

  static get relationMappings () {
    return {
      token: {
        relation: Model.BelongsToOneRelation,
        modelClass: Token,
        join: {
          from: this.tableName + '.id',
          to: Token.tableName + '.userId'
        }
      },
      roles: {
        relation: Model.BelongsToOneRelation,
        modelClass: Roles,
        join: {
          from: this.tableName + '.rolesId',
          to: Roles.tableName + '.id'
        }
      },
      products: {
        relation: Model.HasManyRelation,
        modelClass: Products,
        join: {
          from: this.tableName + '.id',
          to: Products.tableName + '.userId'
        }
      },
      favoritesProducts: {
        relation: Model.HasManyRelation,
        modelClass: FavoritesProducts,
        join: {
          from: this.tableName + '.id',
          to: Products.tableName + '.userId'
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
