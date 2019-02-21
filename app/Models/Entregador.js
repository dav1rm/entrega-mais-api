'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Entregador extends Model {
    usuario() {
        return this.hasOne('App/Models/User', 'usr_et_id', 'id')
    }
    entregas() {
        return this.hasMany('App/Models/Entrega')
    }
}

module.exports = Entregador
