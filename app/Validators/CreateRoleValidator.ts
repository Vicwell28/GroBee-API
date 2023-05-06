import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateRoleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [ 
      rules.minLength(4),
      rules.unique({ table: 'roles', column: 'name' }),
    ]), 
    
    description: schema.string.optional({}, [
      rules.minLength(4)
    ])
  })

 
  public messages: CustomMessages = {
    required: 'The {{ field }} is required to create a new account',
    'name.unique': 'Name not available'
  }
}
