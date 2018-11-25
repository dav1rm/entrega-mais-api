'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StatusSchema extends Schema {
  up() {
    this.create('statuses', (table) => {
      table.increments()
      table.integer('entrega_id').unsigned().references('id').inTable('entregas')
      table.string('atual', 30).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('statuses')
  }
}

module.exports = StatusSchema
