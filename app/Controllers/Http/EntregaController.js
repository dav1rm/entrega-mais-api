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

        var vendedor_atual = await Vendedor
            .findByOrFail('user_vend_id', usuario_atual.id)

        console.log(vendedor_atual.endereco_vend_id)

        if (vendedor_atual.endereco_vend_id == null) {
            return '{"message" : "Você precisa cadastrar seu endereço"}'
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

    async entregasDisponiveis() {
        const entrega = await Entrega.findByOrFail('status', 1)

        console.log(entrega)
    }
    async minhasEntregas({ auth }) {
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
        const dados = await request.all()

        if (dados.id == null) {
            return '{"message" : "Por favor especifique o ID da entrega"}'
        }

        const entrega = await Entrega.findByOrFail('id', dados.id)

        try {
            entrega.frete = dados.frete
            entrega.telefone_cliente = dados.telefone_cliente
            entrega.nome_cliente = dados.nome_cliente

            entrega.save()
        } catch (error) {

        }

        try {
            const endereco = await Endereco.findByOrFail('id', entrega.endereco_id)

            endereco.cep = dados.cep
            endereco.estado = dados.estado
            endereco.cidade = dados.cidade
            endereco.bairro = dados.bairro
            endereco.rua = dados.rua
            endereco.numero = dados.numero
            endereco.complemento = dados.complemento

            endereco.save()
        } catch (error) {

        }

        try {
            const produto = await Produto.findByOrFail('id', produto.produto_id)

            produto.nome = request.nome
            produto.valor = request.valor

            produto.save()
        } catch (error) {

        }

        return entrega
    }

    async atualizarStatus({ request }) {
        const novo_status = request.all()

        const status = await Database
            .table('statuses')
            .where('entrega_id', novo_status.entrega_id)

        var status_atualizado = null

        for (var i = 0; i < 5; i++) {
            if (status[i].titulo == novo_status.titulo) {
                status_atualizado = await Database
                    .table('statuses')
                    .where('id', status[i].id)
                    .update('atual', true)

                status[i].atual = true
                status_atualizado = status[i]
            } else {
                await Database
                    .table('statuses')
                    .where('id', status[i].id)
                    .update('atual', false)
            }
        }

        return status_atualizado
    }

    async aceitar({ request, auth }) {
        const user = auth.user

        const message = '{"message" : "Você não é um entregador"}'

        if (user.tipo == 'v') {
            return message
        }

        const dados = request.all()
        const entrega = await Entrega.findByOrFail('id', dados.id)
        const entregador = await Entregador.findByOrFail('user_ent_id', user.id)

        entrega.entregador_id = entregador.id

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
