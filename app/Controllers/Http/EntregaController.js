'use strict'

const Status = use('App/Models/Status')
const Entrega = use('App/Models/Entrega')
const Endereco = use('App/Models/Endereco')
const Produto = use('App/Models/Produto')
const Vendedor = use('App/Models/Vendedor')
const Entregador = use('App/Models/Entregador')
const Database = use('Database')

class EntregaController {
    async solicitar({ request, auth }) {
        const usuario_atual = auth.user

        if (usuario_atual.tipo == 'e') {
            return '{"message" : "Você não é um vendedor}'
        }

        const dados_entrega = request.only([
            'status',
            'preco',
            'nome_cliente',
            'telefone_cliente',
            'frete'
        ])

        const dados_status = request.only([
            'data',
            'titulo',
            'atual',
            'descricao'
        ])

        const dados_produto = request.only([
            'nome',
            'valor'
        ])


        const dados_endereco = request.only([
            'cep',
            'estado',
            'cidade',
            'bairro',
            'rua',
            'numero',
            'complemento'
        ])

        var preco_taxa = dados_entrega.frete + (dados_entrega.frete / 2)

        const produto = await Produto.create(dados_produto)
        const endereco = await Endereco.create(dados_endereco)
        const status = await Status.create(dados_status)

        var vendedor_atual = await Vendedor
            .findByOrFail('user_vend_id', usuario_atual.id)

        console.log(usuario_atual.id)

        dados_entrega.vendedor_id = vendedor_atual.id
        dados_entrega.taxa = preco_taxa
        dados_entrega.endereco_id = endereco.id
        dados_entrega.produto_id = produto.id
        dados_entrega.status_id = status.id

        const entrega = await Entrega.create(dados_entrega)

        return entrega
    }

    async visualizar({ auth }) {
        const usuario_atual = await auth.getUser()

        switch (usuario_atual.tipo) {
            case 'v':
                var vendedor_atual = await Vendedor
                    .findByOrFail('user_vend_id', usuario_atual.id)
                console.log(vendedor_atual)

                const entregas_vendedor = await Database
                    .from('entregas')
                    .where('vendedor_id', vendedor_atual.id)

                return entregas_vendedor
            case 'e':
                var entregador_atual = await Entregador
                    .findByOrFail('user_ent_id', usuario_atual.id)
                console.log(usuario_atual.id)
                const entregas_entregador = await Database
                    .from('entregas')
                    .where('entregador_id', entregador_atual.id)

                return entregas_entregador
            default:
                return
        }
    }
    async cancelar({ request }) {
        const dados_entrega = request.only(['id'])

        const affectedRows = await Database
            .table('entregas')
            .where('id', dados_entrega.id)
            .update({ status: 'Cancelada' })

        return true
    }
    async finalizar({ request }) {
        const dados_entrega = request
            .only(['id'])

        const affectedRows = await Database
            .table('entregas')
            .where('id', dados_entrega.id)
            .update({ status: 'Finalizada' })

        return true
    }
}


module.exports = EntregaController
