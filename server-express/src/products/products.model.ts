import { Model } from 'objection'
import { dbKnex } from '../db'

import Users from '../users/users.model'
import Category from './category/category.model'
import Review from '../review/review.model'
import ProductsPrice from './prices/productsPrice.model'
Model.knex(dbKnex)

// NewsModel
export default class ProductsModel extends Model {
  public id!: number
  public title!: string
  public category_id!: number
  public user_id!: number
  public description!: string
  public count!: number
  public availability!: boolean
  public screen!: string
  public image1!: string
  public image2!: string
  public image3!: string
  public image4!: string
  public image5!: string
  public image6!: string
  public image7!: string
  public image8!: string
  public image9!: string
  public image10!: string
  public video_youtube_url!: string
  public parent_id!: number
  public url!: string
  public created_at!: Date | string
  public updated_at!: Date | string

  users?: Users
  category?: Category
  review?: Review
  products_price?: ProductsPrice

  static get tableName () {
    return 'products'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 5, maxLength: 255 },
        category_id: { type: 'integer' },
        user_id: { type: 'integer' },
        description: { type: 'string', minLength: 10, maxLength: 3000 },
        count: { type: 'integer' },
        availability: { type: 'boolean' },
        screen: { type: 'string', maxLength: 255 },
        image1: { type: 'string', maxLength: 255 },
        image2: { type: 'string', maxLength: 255 },
        image3: { type: 'string', maxLength: 255 },
        image4: { type: 'string', maxLength: 255 },
        image5: { type: 'string', maxLength: 255 },
        image6: { type: 'string', maxLength: 255 },
        image7: { type: 'string', maxLength: 255 },
        image8: { type: 'string', maxLength: 255 },
        image9: { type: 'string', maxLength: 255 },
        image10: { type: 'string', maxLength: 255 },
        video_youtube_url: { type: 'string', maxLength: 255 },
        parent_id: { type: 'integer' },
        url: { type: 'string', maxLength: 255 },
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
      category: {
        relation: Model.HasManyRelation,
        modelClass: Category,
        join: {
          from: this.tableName + '.category_id',
          to: Category.tableName + '.id'
        }
      },
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: this.tableName + '.id',
          to: Review.tableName + '.product_id'
        }
      },
      parent: {
        relation: Model.BelongsToOneRelation,
        modelClass: this,
        join: {
          from: this.tableName + '.parent_id',
          to: this.tableName + '.id'
        }
      },
      product_price: {
        relation: Model.HasManyRelation,
        modelClass: ProductsPrice,
        join: {
          from: this.tableName + '.id',
          to: ProductsPrice.tableName + '.product_id'
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
