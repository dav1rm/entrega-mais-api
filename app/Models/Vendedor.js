'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Vendedor extends Model {
    entregas() {
        this.hasMany('App/Model/Entrega')
    }
    usuario() {
        this.belongsTo('App/Model/User')
    }
    endereco() {
        this.belongsTo('App/Model/Endereco')
    }
    produtos() {
        this.belongsTo('App/Model/Produto')
    }
}

module.exports = Vendedor
