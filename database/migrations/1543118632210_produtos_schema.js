'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProdutosSchema extends Schema {
  up() {
    this.create('produtos', (table) => {
      table.increments()
      table.integer('prod_vend_id').unsigned().references('id').inTable('users').onDelete('cascade')
      table.string('nome', 100).notNullable()
      table.decimal('valor', 6, 2).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('produtos')
  }
}

module.exports = ProdutosSchema
