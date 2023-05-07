import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'
import { SeederRoles } from 'Database/files/SeederRoles'

export default class RoleSeeder extends BaseSeeder {
  static async run () {
    await Role.createMany(SeederRoles)
  }
}
