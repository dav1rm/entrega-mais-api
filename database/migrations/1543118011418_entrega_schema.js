'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EntregaSchema extends Schema {
  up() {
    this.create('entregas', (table) => {
      table.increments()
      table.integer('entregador_id').unsigned().references('id').inTable('entregadors')
      table.integer('vendedor_id').unsigned().references('id').inTable('vendedors')
      table.string('valor', 10).notNullable()
      table.string('taxa', 10).notNullable().defaultTo('0,00')
      table.string('nome_cliente', 50).notNullable()
      table.string('telefone_cliente', 15).notNullable()
      table.string('pagamento', 10).notNullable();
      table.timestamps()
    })
  }

  down() {
    this.drop('entregas')
  }
}

module.exports = EntregaSchema
