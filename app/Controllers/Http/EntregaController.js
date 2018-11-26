'use strict'

const Entrega = use('App/Models/Entrega')

class EntregaController {
    async solicitar({ request }) {
        const data = request.only(
            [
                'entregador_id',
                'vendedor_id',
                'endereco_id',
                'valor',
                'taxa',
                'nome_cliente',
                'telefone_cliente',
                'pagamento'
            ]);

        const entrega = await Entrega.create(data)

        return entrega
    }
    async solicitar({ request }) {
        const data = request.only(
            [
                'entregador_id',
                'vendedor_id',
                'endereco_id',
                'produto_id',
                'status_id',
                'valor',
                'taxa',
                'nome_cliente',
                'telefone_cliente',
                'pagamento'
            ]);

        const entrega = await Entrega.create(data)

        return entrega
    }
}

module.exports = EntregaController
