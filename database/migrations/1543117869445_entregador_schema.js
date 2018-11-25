'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EntregadorSchema extends Schema {
  up() {
    this.create('entregadors', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down() {
    this.drop('entregadors')
  }
}

module.exports = EntregadorSchema
