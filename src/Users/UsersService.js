const UsersService = {
  getUsers(knex) {
    return knex.select('*').from('users')
  },
  createUser(knex, newUser) {
    return knex('users')
      .insert(newUser)
      .returning('*')
  }
}

module.exports = UsersService
