const express = require('express')
const CategoriesService = require('./CategoriesService')
const { requireAuth } = require('../Middleware/jwt-auth')

const categoriesRouter = express.Router()
const jsonParser = express.json()

categoriesRouter
    .route('/')
    .get(requireAuth, (req, res, next) => {
        CategoriesService.getCategories(req.app.get('db'), req.user.id)
            .then(cats => res.json(cats))
    })
    .post(requireAuth, jsonParser, (req, res, next) => {
        const { category_name } = req.body
        const { id } = req.user
        const newCategory = {
            category_name,
            user_id: id
        }
        CategoriesService.createCategory(req.app.get('db'), newCategory)
            .then(cat => res.status(201).json({ message: "created" }))
    })

module.exports = categoriesRouter
