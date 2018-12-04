'use strict'

const Vendedor = use('App/Models/Vendedor')

class VendedorController {
    async visualizar({ auth }) {
        const usuario = auth.user

        const vendedores = await Vendedor
            .query()
            .where('usr_vd_id', usuario.id)
            .with('usuario')
            .with('endereco')
            .fetch()

        return vendedores
    }
}

module.exports = VendedorController
