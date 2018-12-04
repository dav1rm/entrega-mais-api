'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VendedorSchema extends Schema {
  up() {
    this.create('vendedors', (table) => {
      table.increments()
      table.integer('usr_vd_id').unique().unsigned().references('id').inTable('users').onDelete('cascade')
      table.integer('endereco_vend_id').unique().unsigned().references('id').inTable('enderecos').onDelete('cascade')
      table.timestamps()
    })
  }

  down() {
    this.drop('vendedors')
  }
}

module.exports = VendedorSchema
