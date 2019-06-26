const express = require('express')
const CategoriesService = require('./CategoriesService')

const categoriesRouter = express.Router()
const jsonParser = express.json()

categoriesRouter
    .route('/')
    .get((req, res, next) => {
        CategoriesService.getCategories(req.app.get('db'))
            .then(cats => res.json(cats))
    })
    .post(jsonParser, (req, res, next) => {
        const { category_name } = req.body
        const newCategory = {
            category_name
        }
        CategoriesService.createCategory(req.app.get('db'), newCategory)
            .then(cat => res.status(201).end())
    })

module.exports = categoriesRouter
