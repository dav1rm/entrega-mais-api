'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VendedorSchema extends Schema {
  up() {
    this.create('vendedors', (table) => {
      table.increments()
      table.integer('user_vend_id').unique().unsigned().references('id').inTable('users').onDelete('set null')
      table.integer('endereco_vend_id').unique().unsigned().references('id').inTable('enderecos').onDelete('set null')
      table.timestamps()
    })
  }

  down() {
    this.drop('vendedors')
  }
}

module.exports = VendedorSchema
