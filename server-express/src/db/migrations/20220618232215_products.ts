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
      tbl.integer('category_id')
        .references('id')
        .inTable('category')
        .unsigned()
        .onUpdate('CASCADE')
        .notNullable()
      tbl.integer('user_id')
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
      tbl.integer('price_type_id')
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
      tbl.string('video_youtube_url')
        .defaultTo(null)
      tbl.integer('parent_id')
        .defaultTo(null)
      tbl.string('url', 255)
      tbl.timestamps(true, true)
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
