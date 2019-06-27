const UsersService = {
  getUsers(knex) {
    return knex.select('*').from('users')
  },
  createUser(knex, newUser) {
    return knex('users')
      .insert(newUser)
      .returning('*')
  },
  getUserById(knew, userId) {
    return knex.select('*').from('users').where({id: userId})
  }
  updateIncome(knex, userId, newAmount) {
    return knew('users')
      .where({id: userId})
      .update({income: newAmount})
  }
}

module.exports = UsersService
