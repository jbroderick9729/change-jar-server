require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const categoriesRouter = require('./Categories/categories-router')
const expensesRouter = require('./Expenses/expenses-router')
const budgetAllotmentsRouter = require('./BudgetAllotments/budget-allotments-router')
const usersRouter = require('./Users/users-router')
const authRouter = require('./Auth/auth-router')

const { NODE_ENV } = require('./config')


const app = express()

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common'

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())

app.use('/api/categories', categoriesRouter)
app.use('/api/expenses', expensesRouter)
app.use('/api/budget-allotments', budgetAllotmentsRouter)
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)

app.use(function (error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

app.get('/api/', (req, res) => {
  res.send('Hello, world!')
})
module.exports = app
