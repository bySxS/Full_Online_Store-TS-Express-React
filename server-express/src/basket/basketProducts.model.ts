import { Model } from 'objection'
import { dbKnex } from '../db'

import Products from '../products/products.model'
import Basket from './basket.model'
import ProductsPrice from '../products/prices/productsPrice.model'

Model.knex(dbKnex)

export default class BasketProductsModel extends Model {
  public id!: number
  public basket_id!: number
  public product_id!: number
  public product_price_id!: number
  public current_price!: number
  public product_count!: number
  public created_at!: Date | string
  public updated_at!: Date | string

  basket?: Basket
  products?: Products

  static get tableName () {
    return 'basket_products'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        basket_id: { type: 'integer' },
        product_id: { type: 'integer' },
        product_price_id: { type: 'integer' },
        current_price: { type: 'number' },
        product_count: { type: 'integer' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
      }
    }
  }

  static get relationMappings () {
    return {
      basket: {
        relation: Model.BelongsToOneRelation,
        modelClass: Basket,
        join: {
          from: this.tableName + '.basket_id',
          to: Basket.tableName + '.id'
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
      product_price: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProductsPrice,
        join: {
          from: this.tableName + '.product_price_id',
          to: ProductsPrice.tableName + '.id'
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
