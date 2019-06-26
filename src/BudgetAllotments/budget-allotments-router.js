const express = require('express')
const BudgetAllotmentsService = require('./BudgetAllotmentsService')

const budgetAllotmentsRouter = express.Router()
const jsonParser = express.json()

budgetAllotmentsRouter
    .route('/')
    .get((req, res, next) => {
        BudgetAllotmentsService.getBudgetAllotments(req.app.get('db'))
            .then(allotments => res.status(200).json(allotments))
    })
    .post(jsonParser, (req, res, next) => {
        const { budget_name } = req.body
        const newBudgetAllotment = {
            budget_name
        }
        BudgetAllotmentsService.createBudgetAllotment(req.app.get('db'), newBudgetAllotment)
            .then(budgetAllotment => res.status(201).end())
    })

    budgetAllotmentsRouter
    .route('/id')
    .patch(jsonParser, (req, res, next) => {
        const { id } = req.params
        const { newBudgetAllotment } = req.body
        BudgetAllotmentsService.updateBudgetAllotment(req.app.get('db'), id, newBudgetAllotment)
    })

module.exports = budgetAllotmentsRouter
