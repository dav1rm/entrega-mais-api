'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EntregaSchema extends Schema {
  up() {
    this.create('entregas', (table) => {
      table.increments()
      table.integer('entregador_id').unsigned().references('id').inTable('entregadors').onDelete('set null')
      table.integer('vendedor_id').unsigned().references('id').inTable('vendedors').onDelete('set null')
      table.integer('endereco_id').unique().unsigned().references('id').inTable('enderecos').onDelete('set null')
      table.integer('produto_id').unsigned().references('id').inTable('produtos').onDelete('set null')
      table.decimal('taxa', 6, 2).default(10.00)
      table.decimal('frete', 6, 2).notNullable()
      table.string('nome_cliente', 50).notNullable()
      table.string('telefone_cliente', 15).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('entregas')
  }
}

module.exports = EntregaSchema
