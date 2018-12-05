'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Entrega extends Model {
    vendedor() {
        return this.belongsTo('App/Models/Vendedor')
    }
    entregador() {
        return this.belongsTo('App/Models/Entregador')
    }

    endereco() {
        return this.belongsTo('App/Models/Endereco')
    }
    produto() {
        return this.belongsTo('App/Models/Produto')
    }
    status() {
        return this.hasMany('App/Models/Status')
    }
}

module.exports = Entrega
