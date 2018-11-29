'use strict'

const Entrega = use('App/Models/Entrega')
const Endereco = use('App/Models/Endereco')
const Produto = use('App/Models/Produto')

class EntregaController {
    async solicitar({ request, auth }) {
        const dados_endereco = request.only([
            'cep',
            'estado',
            'cidade',
            'bairro',
            'rua',
            'numero'
        ])

        const dados_produto = request.only([
            'nome',
            'valor'
        ])

        const dados_entrega = request.only([
            'vendedor_id',
            'status',
            'valor',
            'nome_cliente',
            'telefone_cliente',
            'pagamento'
        ])

        const endereco = await Endereco.create(dados_endereco)
        const produto = await Produto.create(dados_produto)
        const usuario_atual = await auth.getUser()
        var val_ent = dados_entrega.valor

        dados_entrega.vendedor_id = usuario_atual.id
        dados_entrega.endereco_id = endereco.id
        dados_entrega.produto_id = produto.id
        dados_entrega.taxa = val_ent + (val_ent / 2)

        const entrega = await Entrega.create(dados_entrega)
        console.log(dados_entrega.taxa)

        return entrega
    }
}

module.exports = EntregaController
