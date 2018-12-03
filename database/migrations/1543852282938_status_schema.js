'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StatusSchema extends Schema {
  up() {
    this.create('statuses', (table) => {
      table.increments()
      table.integer('entrega_id')
        .unique()
        .unsigned()
        .references('id')
        .inTable('entregas')
        .onDelete('cascade')
      table
        .string('data', 25)
        .notNullable()
      table
        .string('titulo', 25)
        .notNullable()
      table
        .boolean('atual')
        .notNullable()
        .default('true')
      table
        .string('circleColor')
      table
        .string('lineColor')
      table
        .string('descricao')
        .notNullable()
        .default('A entrega foi solicitada e está aguardando a aprovação de um entregador.')
      table.timestamps()
    })
  }

  down() {
    this.drop('statuses')
  }
}

module.exports = StatusSchema
