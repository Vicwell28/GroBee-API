import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import RoleSeeder from '../Role'

export default class extends BaseSeeder {
  
  public async run() {
    await RoleSeeder.run()
  }
}
