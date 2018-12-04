'use strict'

const Hash = use('Hash')
const User = use('App/Models/User')
const Entregador = use('App/Models/Entregador')
const Vendedor = use('App/Models/Vendedor')

class UserController {
    async cadastrar({ request }) {
        const dados_usuario = request.only([
            'name',
            'password',
            'email',
            'cpf',
            'telefone',
            'tipo'
        ]);

        switch (dados_usuario.tipo) {
            case 'e': {
                const user_ent = await User.create(dados_usuario)
                const dados_entregador = { user_ent_id: user_ent.id }
                await Entregador.create(dados_entregador)

                return user_ent
            }

            case 'v': {
                const user_vend = await User.create(dados_usuario)
                const dados_vendedor = { user_vend_id: user_vend.id }
                await Vendedor.create(dados_vendedor)

                return user_vend
            }
            default: {
                return '{"message" : "Por favor especifique o tipo de usuário"}'
            }
        }

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
