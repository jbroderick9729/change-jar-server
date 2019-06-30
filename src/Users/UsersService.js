const bcrypt = require('bcryptjs')
const xss = require('xss')

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

const UsersService = {
  getUsers(knex) {
    return knex.select('*').from('users')
  },
  hasUserWithUserName(knex, username) {
    return knex('users')
      .where({ username })
      .first()
      .then(user => !!user)
  },
  insertUser(knex, newUser) {
    return knex
      .insert(newUser)
      .into('users')
      .returning('*')
      .then(([user]) => user)
  },
  validatePassword(password) {
    if (password.length < 8) {
      return 'Password be longer than 8 characters'
    }
    if (password.length > 72) {
      return 'Password be less than 72 characters'
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces'
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain one upper case, lower case, number and special character'
    }
    return null
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12)
  },
  serializeUser(user) {
    return {
      id: user.id,
      first_name: xss(user.first_name),
      last_name: xss(user.last_name),
      username: xss(user.username),
      date_created: new Date(user.date_created),
    }
  },
  getUserById(knex, userId) {
    return knex.select('*').from('users').where({ id: userId })
  },
  updateIncome(knex, userId, amount) {
    const newAmount = parseInt(amount)
    return knex('users')
      .where({ id: userId })
      .update({ income: newAmount })
      .returning('*')
  }
}

module.exports = UsersService
