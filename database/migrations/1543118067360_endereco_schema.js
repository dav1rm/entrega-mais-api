'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnderecoSchema extends Schema {
  up() {
    this.create('enderecos', (table) => {
      table.increments()
      table.string('cep', 10).notNullable()
      table.string('estado', 2).notNullable()
      table.string('cidade', 50).notNullable()
      table.string('bairro', 50).notNullable()
      table.string('rua', 50).notNullable()
      table.string('numero', 5).notNullable()
      table.string('complemento', 25).default("Nenhum")
      table.timestamps()
    })
  }

  down() {
    this.drop('enderecos')
  }
}

module.exports = EnderecoSchema
