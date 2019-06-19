const express = require('./node_modules/express')
const ExpensesService = require('./ExpensesService')

const expensesRouter = express.Router()

expensesRouter
    .route('/')
    .get((req, res, next) => {
        ExpensesService.getExpenses(req.app.get('db'))
            .then(cats => res.json(cats))
    })

module.exports = ExpensesRouter
