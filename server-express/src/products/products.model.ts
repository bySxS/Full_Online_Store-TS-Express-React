import { Model } from 'objection'
import { dbKnex } from '@/db'

import Users from '@/users/users.model'
import Category from '../category/category.model'
import Review from '@/review/review.model'
import ProductsPrice from './prices/productsPrice.model'
import ProductsViews from './views/productsViews.model'
import ProductsPriceType from './prices/productsPriceType.model'
import CharacteristicsSetValue from '@/characteristics/characteristicsSetValue.model'
import FavoritesProducts from '@/favoritesProducts/favoritesProducts.model'
Model.knex(dbKnex)

// ProductsModel
export default class ProductsModel extends Model {
  public id!: number
  public title!: string
  public categoryId!: number
  public userId!: number
  public description!: string
  public count!: number
  public priceTypeId!: number
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
  public videoYoutubeUrl!: string
  public parentId!: number
  public url!: string
  public createdAt!: Date | string
  public updatedAt!: Date | string

  users?: Users
  category?: Category
  review?: Review
  productsPrice?: ProductsPrice
  productsViews?: ProductsViews

  // innerJoin as
  public priceId!: number

  static get tableName () {
    return 'products'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 5, maxLength: 255 },
        categoryId: { type: 'integer' },
        userId: { type: 'integer' },
        description: { type: 'string', minLength: 10, maxLength: 3000 },
        count: { type: 'integer' },
        priceTypeId: { type: 'integer' },
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
        videoYoutubeUrl: { type: 'string', maxLength: 255 },
        parentId: { type: 'integer' },
        url: { type: 'string', maxLength: 255 },
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
      category: {
        relation: Model.HasOneRelation,
        modelClass: Category,
        join: {
          from: this.tableName + '.categoryId',
          to: Category.tableName + '.id'
        }
      },
      characteristicsSetValue: {
        relation: Model.HasManyRelation,
        modelClass: CharacteristicsSetValue,
        join: {
          from: this.tableName + '.id',
          to: CharacteristicsSetValue.tableName + '.productId'
        }
      },
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: this.tableName + '.id',
          to: Review.tableName + '.productId'
        }
      },
      favorites: {
        relation: Model.HasManyRelation,
        modelClass: FavoritesProducts,
        join: {
          from: this.tableName + '.id',
          to: FavoritesProducts.tableName + '.productId'
        }
      },
      parent: {
        relation: Model.HasOneRelation,
        modelClass: this,
        join: {
          from: this.tableName + '.parentId',
          to: this.tableName + '.id'
        }
      },
      price: {
        relation: Model.HasManyRelation,
        modelClass: ProductsPrice,
        join: {
          from: this.tableName + '.id',
          to: ProductsPrice.tableName + '.productId'
        }
      },
      priceType: {
        relation: Model.HasOneRelation,
        modelClass: ProductsPriceType,
        join: {
          from: this.tableName + '.priceTypeId',
          to: ProductsPriceType.tableName + '.id'
        }
      },
      views: {
        relation: Model.HasOneRelation,
        modelClass: ProductsViews,
        join: {
          from: this.tableName + '.id',
          to: ProductsViews.tableName + '.productId'
        }
      }
    }
  }

  $beforeInsert () {
    this.createdAt = new Date(Date.now()) // new Date().toISOString()
  }

  $beforeUpdate () {
    this.updatedAt = new Date(Date.now()) // new Date().toISOString()
  }
}
