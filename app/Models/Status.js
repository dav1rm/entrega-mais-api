'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Status extends Model {
    entregas() {
        return this.belongsTo('/App/Models/Entrega')
    }
}

module.exports = Status
