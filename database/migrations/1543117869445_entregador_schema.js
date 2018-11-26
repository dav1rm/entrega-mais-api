'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EntregadorSchema extends Schema {
  up() {
    this.create('entregadors', (table) => {
      table.increments()
      table.integer('user_ent_id').unique().unsigned().references('id').inTable('users').onDelete('set null')
      table.biginteger('latitude').default(0)
      table.biginteger('longitude').default(0)
      table.timestamps()
    })
  }

  down() {
    this.drop('entregadors')
  }
}

module.exports = EntregadorSchema
