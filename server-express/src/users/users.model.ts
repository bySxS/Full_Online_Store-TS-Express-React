import { Model } from 'objection'
import { dbKnex } from '@/db'

import Roles from './roles/roles.model'
import Token from './token/token.model'
import Products from '@/products/products.model'
import FavoritesProducts from '@/products/favorites/favoritesProducts.model'
Model.knex(dbKnex)

export default class UsersModel extends Model {
  public id!: number
  public nickname!: string
  public full_name!: string
  public city!: string
  public address!: string
  public delivery_address!: string
  public phone_number!: string
  public roles_id!: number
  public email!: string
  public password!: string
  public isActivated!: boolean
  public isSubscribeToNews!: boolean
  public avatar!: string
  public activateLink!: string
  public registration_Ip!: string
  public created_at!: Date | string
  public updated_at!: Date | string

  roles?: Roles[]
  token?: Token
  products?: Products
  favorites_products?: FavoritesProducts

  static get tableName () {
    return 'users'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        nickname: { type: 'string', minLength: 1, maxLength: 40 },
        full_name: { type: 'string', minLength: 1, maxLength: 100 },
        city: { type: 'string', minLength: 1, maxLength: 100 },
        address: { type: 'string', minLength: 1, maxLength: 1000 },
        delivery_address: { type: 'string', minLength: 1, maxLength: 255 },
        phone_number: { type: 'string', minLength: 1, maxLength: 20 },
        roles_id: { type: 'integer' },
        email: { type: 'string', minLength: 1, maxLength: 100 },
        password: { type: 'string', minLength: 1, maxLength: 200 },
        isActivated: { type: 'boolean' },
        isSubscribeToNews: { type: 'boolean' },
        avatar: { type: 'string' },
        activateLink: { type: 'string', minLength: 0, maxLength: 100 },
        registration_Ip: { type: 'string', minLength: 1, maxLength: 100 },
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
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
          to: Token.tableName + '.user_id'
        }
      },
      roles: {
        relation: Model.BelongsToOneRelation,
        modelClass: Roles,
        join: {
          from: this.tableName + '.roles_id',
          to: Roles.tableName + '.id'
        }
      },
      products: {
        relation: Model.HasManyRelation,
        modelClass: Products,
        join: {
          from: this.tableName + '.id',
          to: Products.tableName + '.user_id'
        }
      },
      favoritesProducts: {
        relation: Model.HasManyRelation,
        modelClass: FavoritesProducts,
        join: {
          from: this.tableName + '.id',
          to: Products.tableName + '.user_id'
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
