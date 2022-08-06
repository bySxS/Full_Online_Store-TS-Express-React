import { Model } from 'objection'
import { dbKnex } from '@/db'

import Products from '../products/products.model'
import Basket from './basket.model'
import ProductsPrice from '../products/prices/productsPrice.model'

Model.knex(dbKnex)

export default class BasketProductsModel extends Model {
  public id!: number
  public basketId!: number
  public productId!: number
  public productPriceId!: number
  public currentPrice!: number
  public productCount!: number
  public createdAt!: Date | string
  public updatedAt!: Date | string

  basket?: Basket
  products?: Products

  static get tableName () {
    return 'basketProducts'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        basketId: { type: 'integer' },
        productId: { type: 'integer' },
        productPriceId: { type: 'integer' },
        currentPrice: { type: 'number' },
        productCount: { type: 'integer' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' }
      }
    }
  }

  static get relationMappings () {
    return {
      basket: {
        relation: Model.BelongsToOneRelation,
        modelClass: Basket,
        join: {
          from: this.tableName + '.basketId',
          to: Basket.tableName + '.id'
        }
      },
      products: {
        relation: Model.BelongsToOneRelation,
        modelClass: Products,
        join: {
          from: this.tableName + '.productId',
          to: Products.tableName + '.id'
        }
      },
      productsPrice: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProductsPrice,
        join: {
          from: this.tableName + '.productPriceId',
          to: ProductsPrice.tableName + '.id'
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
