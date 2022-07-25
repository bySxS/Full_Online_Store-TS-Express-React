/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable('favoritesProducts', tbl => {
      tbl.increments('id')
        .primary()
        .unsigned()
      tbl.integer('userId')
        .references('id')
        .inTable('users')
        .unsigned()
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl.integer('productId')
        .references('id')
        .inTable('products')
        .unsigned()
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl.timestamps(true, true, true)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex) {
  return knex.schema
    .dropTable('favoritesProducts')
}
