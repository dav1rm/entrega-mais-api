'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Entregador extends Model {
    entregas() {
        this.hasMany('App/Model/Entrega')
    }
    usuario() {
        this.belongsTo('App/Model/User')
    }
}

module.exports = Entregador
