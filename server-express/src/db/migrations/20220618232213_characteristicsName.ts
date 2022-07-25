/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable('characteristicsName', tbl => {
      tbl.increments('id')
        .primary()
        .unsigned()
      tbl.integer('categoryId')
        // .defaultTo(null)
        .references('id')
        .inTable('category')
        .unsigned()
        .onDelete('SET NULL')
        .onUpdate('CASCADE')
      tbl.string('name', 150)
        .notNullable()
      tbl.string('fieldType', 100)
      tbl.integer('parentId')
        .defaultTo(null)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex) {
  return knex.schema
    .dropTable('characteristicsName')
}
