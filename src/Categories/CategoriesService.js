const CategoriesService = {
    getCategories(knex) {
        return knex.select('*').from('categories')
    }
}

module.exports = CategoriesService
