'use strict'

const Produto = use('App/Models/Produto')
const Endereco = use('App/Models/Endereco')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return {
    title: 'API EntregaMais',
    version: '0.0.1'
  }
})

Route.resource('user', 'UserController').apiOnly().middleware('auth')
Route.resource('produto', 'ProdutoController').apiOnly().middleware('auth')
Route.post('/user/cadastro', 'UserController.cadastrar')
Route.post('/session/login', 'SessionController.create')
//Route.put('/user/alterarSenha', 'UserController.alterarSenha').middleware(['auth:jwt'])
Route.post('/entrega/cadastrar', 'EntregaController.solicitar').middleware(['auth:jwt'])
Route.get('/entrega/visualizar', 'EntregaController.visualizar').middleware(['auth:jwt'])
//Route.put('/entrega/cancelar', 'EntregaController.cancelar').middleware(['auth:jwt'])
//Route.post('/produto/cadastrar', 'ProdutoController.cadastrar').middleware(['auth:jwt'])
