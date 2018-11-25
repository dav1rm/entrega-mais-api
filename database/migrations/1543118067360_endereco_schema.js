'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnderecoSchema extends Schema {
  up() {
    this.create('enderecos', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('entrega_id').unsigned().references('id').inTable('entregas')
      table.string('cep', 9)
      table.string('estado', 2)
      table.string('cidade', 50)
      table.string('bairro', 50)
      table.string('rua', 50)
      table.string('numero', 5)
      table.string('complemento', 25)
      table.integer('latitude')
      table.integer('longitude')
      table.timestamps()
    })
  }

  down() {
    this.drop('enderecos')
  }
}

module.exports = EnderecoSchema
