const express = require('express')
const ExpensesService = require('./ExpensesService')
const { requireAuth } = require('../middleware/jwt-auth')

const expensesRouter = express.Router()
const jsonParser = express.json()

expensesRouter
    .route('/')
    .get(requireAuth, (req, res, next) => {
        ExpensesService.getExpenses(req.app.get('db'), req.user.id)
            .then(expenses => res.json(expenses))
    })
    .post(requireAuth, jsonParser, (req, res, next) => {
        const { date, description, amount, category } = req.body
        
        const newExpense = {
            date,
            description,
            amount,
            category,
            user_id: req.user.id
        }
        ExpensesService.createExpense(req.app.get('db'), newExpense, req.user.id)
            .then(expense => res.status(201).end())
    })

// expensesRouter
//     .route('/:id')
//     .get(requireAuth, (req, res, next) => {
//         const { id } = req.params
//         ExpensesService.getExpensesByCategory(req.app.get('db'), id)
//             .then(expenses => res.status(200).json(expenses))

//     })

module.exports = expensesRouter
