'use strict'

const Hash = use('Hash')
const User = use('App/Models/User')
const Entregador = use('App/Models/Entregador')
const Vendedor = use('App/Models/Vendedor')
const Endereco = use('App/Models/Endereco')

class UserController {
    async perfil({ auth }) {
        const user_atual = auth.user

        const user = await User.findByOrFail('id', user_atual.id)

        switch (user.tipo) {
            case 'v':
                await user.load('vendedor.endereco')
                break
            case 'e':
                await user.load('entregador')
        }

        return user
    }
    async adicionarEndereco({ request, auth }) {
        const user = auth.user

        if (user.tipo != 'v') {
            return '{"message" : "Você não é um vendedor"}'
        }

        const dados_endereco = request.all()

        var vendedor_atual = await Vendedor
            .findByOrFail('usr_vd_id', user.id)

        const endereco = await Endereco.create(dados_endereco)

        vendedor_atual.endereco_vend_id = endereco.id

        vendedor_atual.save()

        return vendedor_atual
    }
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
                const dados_entregador = { usr_et_id: user_ent.id }
                await Entregador.create(dados_entregador)

                return user_ent
            }

            case 'v': {
                const user_vend = await User.create(dados_usuario)
                const dados_vendedor = { usr_vd_id: user_vend.id }
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
