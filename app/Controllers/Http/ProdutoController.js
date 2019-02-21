'use strict'

const Produto = use('App/Models/Produto')

class ProdutoController {
    async cadastrar({ request }) {
        const data = request.only([
            'nome',
            'valor',
        ])

        const produto = await Produto.create({ ...data })

        return produto
    }
}

module.exports = ProdutoController
