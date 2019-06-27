const express = require('express')
const UsersService = require('./UsersService')

const UsersRouter = express.Router()
const jsonParser = express.json()

UsersRouter.route('/')
  .get((req, res, next) => {
    UsersService.getUsers(req.app.get('db')).then(users =>
      res.status(200).json(users)
    )
  })
  .post(jsonParser, (req, res, next) => {
    const { first_name, last_name, username } = req.body
    const newUser = {
      first_name,
      last_name,
      username
    }
    UsersService.createUser(req.app.get('db'), newUser).then(user =>
      res.status(201).end()
    )
  })

UsersRouter.route('/:userId')
  .get((req, res, next) => {
    const { userId } = req.params
    UsersService.getUserById(req.app.get('db'), userId).then(user =>
      res.status(200).json(user)
  )
  .patch(jsonParser, (req, res, next) => {
    const { userId } = req.params
    const { income } = req.body
    UsersService.updateIncome(req.app.get('db'), userId, income)
      .then(user => res.status(204).end())
  }
})

module.exports = UsersRouter
