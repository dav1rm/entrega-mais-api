'use strict'

const Hash = use('Hash')
const User = use('App/Models/User')
const Entregador = use('App/Models/Entregador')
const Endereco = use('App/Models/Endereco')
const Vendedor = use('App/Models/Vendedor')

class UserController {
    async cadastrar({ request }) {
        const dados_usuario = request.only(
            [
                'name',
                'username',
                'email',
                'password',
                'image',
                'cpf',
                'telefone',
                'avaliacao',
                'tipo',
            ]);

        switch (dados_usuario.tipo) {
            case 'e': {
                const user_ent = await User.create(dados_usuario)

                const entregador = new Entregador()
                entregador.user_ent_id = user_ent.id
                entregador.save()

                return user_ent
            }

            case 'v': {
                const dados_endereco = request.only([
                    'endereco'
                ])

                const user_vend = await User.create(dados_usuario)
                const endereco = await Endereco.create(dados_endereco.endereco)

                const vendedor = new Vendedor()
                vendedor.user_vend_id = user_vend.id
                vendedor.endereco_vend_id = endereco.id
                vendedor.save()

                return user_vend
            }
            default: {
                return '{"message" : "Por favor especifique o tipo de usuário"}'
            }
        }

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
