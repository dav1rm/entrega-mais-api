'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VendedorSchema extends Schema {
  up() {
    this.create('vendedors', (table) => {
      table.increments()
      table.integer('user_id').unique().unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down() {
    this.drop('vendedors')
  }
}

module.exports = VendedorSchema
