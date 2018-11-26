'use strict'

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

Route.post('/user/cadastro', 'UserController.cadastrar')
Route.post('/user/login', 'UserController.logar')
Route.put('/user/alterarSenha', 'UserController.alterarSenha').middleware(['auth:jwt'])
Route.post('/entrega/cadastrar', 'EntregaController.solicitar').middleware(['auth:jwt'])


