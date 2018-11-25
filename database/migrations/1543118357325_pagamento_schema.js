'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PagamentoSchema extends Schema {
  up() {
    this.create('pagamentos', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('tipo', 40).notNullable()
      table.string('valor', 10).notNullable()
      table.string('descricao', 150).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('pagamentos')
  }
}

module.exports = PagamentoSchema
