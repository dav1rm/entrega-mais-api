'use strict'

const Vendedor = use('App/Models/Vendedor')

class VendedorController {
    async visualizar({ auth }) {
        const user = auth.user

        const vendedor = await Vendedor
            .query()
            .where('usr_vd_id', user.id)
            .with('usuario')
            .with('endereco')
            .fetch()

        return vendedor
    }
}

module.exports = VendedorController
