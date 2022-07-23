/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { Knex } from 'knex'

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments('id')
        .primary()
        .unsigned()
      tbl.string('nickname', 40)
        .notNullable()
        .unique()
      tbl.index('nickname', 'idx_users_nickname')
      tbl.string('full_name', 100)
      tbl.string('city', 100)
      tbl.string('address', 1000)
      tbl.string('delivery_address')
      tbl.string('phone_number', 20)
      tbl.integer('roles_id')
        .references('id')
        .inTable('roles')
        .unsigned()
        .onDelete('SET NULL')
        .onUpdate('CASCADE')
      tbl.string('email', 100)
        .notNullable()
        .unique()
      tbl.index('email', 'idx_users_email')
      tbl.string('password', 200)
        .notNullable()
      tbl.boolean('isActivated')
        .defaultTo(false)
      tbl.string('activateLink', 100)
      tbl.string('registration_Ip', 100)
      tbl.timestamps(true, true)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex) {
  return knex.schema
    .dropTable('users')
}
