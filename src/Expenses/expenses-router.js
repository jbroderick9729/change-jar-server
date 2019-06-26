const express = require('express')
const ExpensesService = require('./ExpensesService')

const expensesRouter = express.Router()
const jsonParser = express.json()

expensesRouter
    .route('/')
    .get((req, res, next) => {
        ExpensesService.getExpenses(req.app.get('db'))
            .then(expenses => res.json(expenses))
    })
    .post(jsonParser, (req, res, next) => {
        const { date, description, amount, category } = req.body
        const newExpense = {
            date,
            description,
            amount,
            category
        }
        ExpensesService.createExpense(req.app.get('db'), newExpense)
            .then(expense => res.status(201).end())
    })

expensesRouter
    .route('/:id')
    .get((req, res, next) => {
        const { id } = req.params
        ExpensesService.getExpensesByCategory(req.app.get('db'), id)
            .then(expenses => res.status(200).json(expenses))

    })

module.exports = expensesRouter
