const express = require('express')
const CategoriesService = require('./CategoriesService')

const categoriesRouter = express.Router()

categoriesRouter
    .route('/')
    .get((req, res, next) => {
        CategoriesService.getCategories(req.app.get('db'))
            .then(cats => res.json(cats))
    })

module.exports = categoriesRouter
