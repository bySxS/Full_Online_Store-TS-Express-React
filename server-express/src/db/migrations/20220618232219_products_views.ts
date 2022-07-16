/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable('products_views', tbl => {
      tbl.increments('id')
        .primary()
        .unsigned()
      tbl.integer('product_id')
        .references('id')
        .inTable('products')
        .unsigned()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()
        .unique()
      tbl.integer('views')
        .defaultTo(0)
        .notNullable()
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex) {
  return knex.schema
    .dropTable('products_views')
}
