'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProdutosSchema extends Schema {
  up() {
    this.create('produtos', (table) => {
      table.increments()
      table.string('nome', 100).notNullable()
      table.float('valor', 10).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('produtos')
  }
}

module.exports = ProdutosSchema
