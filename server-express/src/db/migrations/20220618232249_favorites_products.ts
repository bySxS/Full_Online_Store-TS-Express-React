/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable('favorites_products', tbl => {
      tbl.increments('id')
        .primary()
        .unsigned()
      tbl.integer('user_id')
        .references('id')
        .inTable('users')
        .unsigned()
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl.integer('product_id')
        .references('id')
        .inTable('products')
        .unsigned()
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl.timestamps(true, true)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex) {
  return knex.schema
    .dropTable('favorites_products')
}
