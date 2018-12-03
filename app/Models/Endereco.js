'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Endereco extends Model {
    vendedor() {
        return this.belongsTo('App/Models/Vendedor')
    }
    entrega() {
        return this.belongsTo('App/Model/Entrega')
    }
}

module.exports = Endereco
