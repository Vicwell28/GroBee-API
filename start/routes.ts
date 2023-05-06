/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})


Route.resource('role', 'RolesController').apiOnly()



Route.post('login', async ({ auth, request, response }) => {
  const email = request.input('email')
  const password = request.input('password')

  try {
    const token = await auth.use('api').attempt(email, password, {
      expiresIn: '1 days'
    })

    return token
  } catch {
    return response.unauthorized('Invalid credentials')
  }
})


/*
Puede verificar si el token es válido o no utilizando el auth.authenticatemétodo. Se lanza la AuthenticationException , si el token no es válido o el usuario no existe dentro de la base de datos.
De lo contrario, puede acceder al usuario que inició sesión utilizando la auth.userpropiedad.
*/

Route.get('dashboard', async ({ auth }) => {
  await auth.use('api').authenticate()

  console.log(auth.use('api').user!)
})


Route.post('/logout', async ({ auth, response }) => {
  await auth.use('api').revoke()
  return {
    revoked: true
  }
})
