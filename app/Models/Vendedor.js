'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Vendedor extends Model {
    entregas() {
        return this.hasMany('App/Models/Entrega')
    }
    usuario() {
        return this.belongsTo('App/Models/User')
    }
    endereco() {
        return this.belongsTo('App/Models/Endereco')
    }
}

module.exports = Vendedor
