'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Entregador extends Model {
    entregas() {
        return this.hasMany('App/Models/Entrega')
    }

    usuario() {
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Entregador
