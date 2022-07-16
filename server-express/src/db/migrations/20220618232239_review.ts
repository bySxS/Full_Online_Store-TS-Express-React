/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable('review', tbl => {
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
      tbl.integer('user_id')
        .references('id')
        .inTable('users')
        .unsigned() // нужен для integer и increment
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()
      tbl.string('comment', 1000)
        .notNullable()
      tbl.string('advantages', 1000)
      tbl.string('flaws', 1000)
      tbl.boolean('bought')
        .notNullable()
        .defaultTo(false)
      tbl.integer('rating')
        .checkIn(['1', '2', '3', '4', '5'])
        .defaultTo(null)
      tbl.integer('parent_id')
        .defaultTo(null)
      tbl.timestamps(true, true)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex) {
  return knex.schema
    .dropTable('review')
}
