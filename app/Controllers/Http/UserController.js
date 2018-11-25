'use strict'

const Hash = use('Hash')
const User = use('App/Models/User')
const Entregador = use('App/Models/Entregador')
const Database = use('Database')

class UserController {
    async cadastrar({ request }) {
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
    async logar({ request, auth }) {
        const { email, password } = request.all()

        const token = await auth.attempt(email, password)

        return token
    }
    async deslogar({ auth }) {
        //O logout e realizado no app
    }
    async alterarSenha({ request, auth, response }) {
        // obtem o usuario atual autenticado
        const user = auth.current.user

        // verifica se a senha atual esta correta
        const verifyPassword = await Hash.verify(
            request.input('password'),
            user.password
        )

        // iforma uma mensagem apropiada
        if (!verifyPassword) {
            return response.status(400).json({
                status: 'error',
                message: 'Senha atual incorreta! Tente novamente.'
            })
        }

        // hash and save new password
        user.password = request.input('newPassword')
        await user.save()

        return response.json({
            status: 'success',
            message: 'Senha alterada!'
        })
    }
}

module.exports = UserController
