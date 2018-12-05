'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Vendedor extends Model {
    usuario() {
        return this.hasOne('App/Models/User', 'usr_vd_id', 'id')
    }
    entregas() {
        return this.hasMany('App/Models/Entrega')
    }
    endereco() {
        return this.belongsTo('App/Models/Endereco', 'endereco_vend_id', 'id')
    }
}

module.exports = Vendedor
