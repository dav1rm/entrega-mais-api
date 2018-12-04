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
    version: '0.1.0'
  }
})

Route.post('/register', 'UserController.cadastrar') //novo usuario
Route.post('/login', 'SessionController.create') //autenticar usuario
Route.post('/entrega/solicitar', 'EntregaController.solicitar').middleware(['auth:jwt']) //nova entrega
Route.post('/entrega/editar', 'EntregaController.editar').middleware(['auth:jwt']) //editar entrega
Route.post('/entrega/status', 'EntregaController.atualizarStatus').middleware(['auth:jwt']) //atualizar status 
Route.post('/vendedor/endereco', 'UserController.adicionarEndereco').middleware(['auth:jwt'])
Route.put('/user/alterarSenha', 'UserController.alterarSenha').middleware(['auth:jwt'])
Route.get('/entregas', 'EntregaController.minhasEntregas').middleware(['auth:jwt'])
Route.get('/entregas/disponiveis', 'EntregaController.entregasDisponiveis').middleware(['auth:jwt'])
Route.post('/entrega/aceitar', 'EntregaController.aceitar').middleware(['auth:jwt']) //aceitar entrega
Route.put('/entrega/cancelar', 'EntregaController.cancelar').middleware(['auth:jwt'])
Route.post('/produto/cadastrar', 'ProdutoController.cadastrar').middleware(['auth:jwt'])
Route.get('/vendedor/visualizar', 'VendedorController.visualizar').middleware(['auth:jwt'])
