const express = require('express')
const path = require('path')
const UsersService = require('./UsersService')
const { requireAuth } = require('../Middleware/jwt-auth')

const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
  .route('/')
  .get(requireAuth, (req, res, next) => {
    UsersService.getUserById(req.app.get('db'), req.user.id)
      .then(user => res.json(user))
  })
  .patch(requireAuth, jsonBodyParser, (req, res, next) => {
    const { income } = req.body
    const { id } = req.user

    UsersService.updateIncome(req.app.get('db'), id, income)
      .then(user => res.status(201).json({ message: "created" }))
  })

usersRouter
  .post('/register', jsonBodyParser, (req, res, next) => {
    console.log('register')
    const { username, password, first_name, last_name } = req.body
    for (const field of ['username', 'password', 'first_name'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })

    const passwordError = UsersService.validatePassword(password)

    if (passwordError)
      return res.status(400).json({ error: passwordError })

    UsersService.hasUserWithUserName(
      req.app.get('db'),
      username
    )
      .then(hasUserWithUserName => {
        if (hasUserWithUserName)
          return res.status(400).json({ error: `Username already taken` })

        return UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              username,
              password: hashedPassword,
              first_name,
              last_name,
            }


            return UsersService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(user => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UsersService.serializeUser(user))
              })
          })
      })
      .catch(next)
  })

module.exports = usersRouter