'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EntregadorSchema extends Schema {
  up() {
    this.create('entregadors', (table) => {
      table.increments()
      table.integer('user_ent_id').unsigned().references('id').inTable('users').onDelete('cascade')
      table.decimal('latitude', 9, 6).default(0)
      table.decimal('longitude', 9, 6).default(0)
      table.timestamps()
    })
  }

  down() {
    this.drop('entregadors')
  }
}

module.exports = EntregadorSchema
