import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import CreateRoleValidator from 'App/Validators/CreateRoleValidator'
import UpdateRoleValidator from 'App/Validators/UpdateRoleValidator'

export default class RolesController {

    public async index({response, request}: HttpContextContract) {

        const orderBy = request.all()['orderBy'] as string | undefined
        console.log(orderBy)
        let role = await Role.all()       
        
        if (orderBy === 'des') {
            role =  role.reverse()
        }

        return response.send(role)
    }
  
    public async store({request, response}: HttpContextContract) {
       const payload = await request.validate(CreateRoleValidator)

       const status = await Role.create(payload)

       return response.send(status)
    }
  
    public async show({request, response}: HttpContextContract) {
        const role = await  Role.findBy('id', request.param('id'))

        if (!role) {
            return false
        }

        return response.send(role)
    }
    
    public async update({request, response}: HttpContextContract) {

        const payload = await request.validate(UpdateRoleValidator)

        const role = await  Role.findBy('id', request.param('id'))

        if (!role) {
            return false
        }

        const updateRole = await role!.merge(payload).save()

        return response.send(updateRole)
    }
  
    public async destroy({request, response}: HttpContextContract) {
        const role = await  Role.findBy('id', request.param('id'))

        if (!role) {
            return false
        }

        const roleDeleted =  await role.delete()

        return response.send(roleDeleted)
    }

}