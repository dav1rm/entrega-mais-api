'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StatusSchema extends Schema {
  up() {
    this.create('statuses', (table) => {
      table.increments()
      table.integer('entrega_id')
        .unsigned()
        .references('id')
        .inTable('entregas')
        .onDelete('cascade')
      table
        .string('titulo', 25)
        .notNullable()
      table
        .boolean('atual')
        .notNullable()
        .default('true')
      table
        .string('circleColor')
      table
        .string('lineColor')
      table
        .string('descricao')
        .notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('statuses')
  }
}

module.exports = StatusSchema
