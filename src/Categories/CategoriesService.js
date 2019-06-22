const CategoriesService = {
    getCategories(knex) {
        return knex.select('*').from('categories')
    },
    createCategory(knex, newCategory) {
        return knex('categories')
            .insert(newCategory)
            .returning('*')
    },
}

module.exports = CategoriesService
