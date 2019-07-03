const express = require('express')
const BudgetAllotmentsService = require('./BudgetAllotmentsService')
const { requireAuth } = require('../Middleware/jwt-auth')

const budgetAllotmentsRouter = express.Router()
const jsonParser = express.json()

budgetAllotmentsRouter
    .route('/')
    .get(requireAuth, (req, res, next) => {
        BudgetAllotmentsService.getBudgetAllotments(req.app.get('db'), req.user.id)
            .then(allotments => res.json(allotments))
    })
    .post(requireAuth, jsonParser, (req, res, next) => {
        const { category, amount } = req.body
        const { id } = req.user
        const newBudgetAllotment = {
            amount,
            category,
            user_id: id
        }
        BudgetAllotmentsService.createBudgetAllotment(req.app.get('db'), newBudgetAllotment)
            .then(allot => res.status(201).json({ message: 'created' }))
    })

module.exports = budgetAllotmentsRouter