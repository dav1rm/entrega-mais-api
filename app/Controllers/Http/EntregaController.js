'use strict'

const Database = use('Database')
const Entrega = use('App/Models/Entrega')
const Endereco = use('App/Models/Endereco')
const Produto = use('App/Models/Produto')
const Vendedor = use('App/Models/Vendedor')
const Entregador = use('App/Models/Entregador')
const Status = use('App/Models/Status')

class EntregaController {
    async solicitar({ request, auth }) {
        const usuario_atual = auth.user

        if (usuario_atual.tipo == 'e') {
            return '{"message" : "Você não é um vendedor}'
        }

        const dados_entrega = request.only([
            'nome_cliente',
            'telefone_cliente',
            'frete'
        ])

        const dados_status = [
            {
                titulo: "Entrega Pendente",
                atual: true,
                descricao: "A entrega foi solicitada e está aguardando a aprovação de um entregador."
            },
            {
                titulo: "Entrega Aceita",
                atual: false,
                circleColor: "gray",
                lineColor: "gray",
                descricao: "A entrega foi aceita. O entregador deverá pegar o produto no endereço do vendedor."
            },
            {
                titulo: "Envio Confirmado",
                atual: false,
                circleColor: "gray",
                lineColor: "gray",
                descricao: "O vendedor repassou o produto para o entregador. O produto está a caminho."
            },
            {
                titulo: "Entrega Confirmada",
                atual: false,
                circleColor: "gray",
                lineColor: "gray",
                descricao: "O produto foi entregue ao cliente."
            },
            {
                titulo: "Entrega Finalizada",
                atual: false,
                circleColor: "gray",
                lineColor: "gray",
                descricao: "O vendedor finalizou a entrega."
            }
        ]

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

        var vendedor_atual = await Vendedor
            .findByOrFail('user_vend_id', usuario_atual.id)

        dados_entrega.vendedor_id = vendedor_atual.id
        dados_entrega.taxa = preco_taxa
        dados_entrega.endereco_id = endereco.id
        dados_entrega.produto_id = produto.id

        const entrega = await Entrega.create(dados_entrega)

        for (var i = 0; i < dados_status.length; i++) {
            dados_status[i].entrega_id = entrega.id
            await Status.create(dados_status[i])
        }

        return entrega
    }

    async visualizar({ auth }) {
        const usuario = auth.user

        switch (usuario.tipo) {
            case 'v':
                const vendedor = await Vendedor.findByOrFail('user_vend_id', usuario.id)
                const entregas_vend = await Entrega
                    .query()
                    .where('vendedor_id', vendedor.id)
                    .with('vendedor')
                    .with('status')
                    .with('entregador')
                    .with('endereco')
                    .with('produto')
                    .fetch()
                return entregas_vend
            case 'e':
                const entregador = await Entregador.findByOrFail('user_ent_id', usuario.id)
                const entregas_ent = await Entrega
                    .query()
                    .where('entregador_id', entregador.id)
                    .with('entregador')
                    .with('vendedor')
                    .with('endereco')
                    .with('status')
                    .with('produto')
                    .fetch()
                return entregas_ent
            default:
                return '{"message" : "Você não possui entregas"}'
        }
    }

    async editar({ request }) {
        const entrega = findOrFail(request.id)
        const endereco = findOrFail(entrega.endereco_id)
        const produto = findOrFail(entrega.produto_id)

        entrega.frete = request.frete
        entrega.telefone_cliente = request.telefone_cliente
        entrega.nome_cliente = request.nome_cliente

        endereco.cep = request.cep
        endereco.estado = request.estado
        endereco.cidade = request.cidade
        endereco.bairro = request.bairro
        endereco.rua = request.rua
        endereco.numero = request.numero
        endereco.complemento = request.complemento

        produto.nome = request.nome
        produto.valor = request.valor

        return entrega
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
