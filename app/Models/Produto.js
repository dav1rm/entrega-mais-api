'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Produto extends Model {
    entrega() {
        return this.belongsTo('App/Models/Entrega')
    }
}

module.exports = Produto
