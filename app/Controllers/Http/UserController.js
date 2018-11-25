'use strict'

const User = use('App/Models/User')
const Entregador = use('App/Models/Entregador')
const Database = use('Database')

class UserController {
    async logar({ request }) {
        const data = request.only(
            [
                'name',
                'username',
                'email',
                'password',
                'image',
                'cpf',
                'telefone',
                'avaliacao',
                'tipo'
            ]);

        var user = null

        switch (data.tipo) {
            case 'e': {
                user = await User.create(data)
                const entregador = await Database
                    .table('entregadors')
                    .insert({ user_id: user.id })
                console.log('ID user: ' + user.id)
                break;
            }

            case 'v': {
                user = await User.create(data)
                const vendedor = await Database
                    .table('vendedors')
                    .insert({ user_id: user.id })
                break;
            }
            default: {
                user = await User.create(data)
                const entregador = await Entregador.create(data.id)
                break;
            }
        }

        return user
    }
    async alterarSenha() {

    }
    async deslogar() {

    }
    async deletarUsuario() {

    }
}

module.exports = UserController
