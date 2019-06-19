const express = require('express')
const CategoriesService = require('./CategoriesService')

const categoriesRouter = express.Router()

categoriesRouter
    .route('/')
    .get((req, res, next) => {
        res.json({})
    })