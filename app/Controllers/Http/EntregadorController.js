'use strict'

const Entregador = use('App/Models/Entregador')

class EntregadorController {
    async visualizar({ auth }) {
        const user = auth.user

        const entregador = await Entregador
            .query()
            .where('usr_et_id', user.id)
            .with('usuario')
            .fetch()

        return entregador
    }
}

module.exports = EntregadorController
