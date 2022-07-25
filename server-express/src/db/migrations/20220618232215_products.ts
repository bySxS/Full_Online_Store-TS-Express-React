/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable('products', tbl => {
      tbl.increments('id')
        .primary()
        .unsigned()
      tbl.string('title', 255)
        .notNullable()
        .unique()
      tbl.index('title', 'idx_products_title')
      tbl.integer('categoryId')
        .references('id')
        .inTable('category')
        .unsigned()
        .onUpdate('CASCADE')
        .notNullable()
      tbl.integer('userId')
        .references('id')
        .inTable('users')
        .unsigned()
        .onDelete('CASCADE')
        .notNullable()
      tbl.string('description', 3000)
        .notNullable()
      tbl.integer('count')
        .defaultTo(1)
        .notNullable()
      tbl.integer('priceTypeId')
        .defaultTo(1)
        .notNullable()
      tbl.boolean('availability')
        .defaultTo(true)
        .notNullable()
      tbl.string('screen')
        .notNullable()
        .defaultTo('')
      tbl.string('image1')
        .defaultTo(null)
      tbl.string('image2')
        .defaultTo(null)
      tbl.string('image3')
        .defaultTo(null)
      tbl.string('image4')
        .defaultTo(null)
      tbl.string('image5')
        .defaultTo(null)
      tbl.string('image6')
        .defaultTo(null)
      tbl.string('image7')
        .defaultTo(null)
      tbl.string('image8')
        .defaultTo(null)
      tbl.string('image9')
        .defaultTo(null)
      tbl.string('image10')
        .defaultTo(null)
      tbl.string('videoYoutubeUrl')
        .defaultTo(null)
      tbl.integer('parentId')
        .defaultTo(null)
      tbl.string('url', 255)
      tbl.timestamps(true, true, true)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex) {
  return knex.schema
    .dropTable('products')
}
