const CategoriesService = {
    getCategories(knex, userId) {
        return knex.select('*').from('categories').where({ user_id: userId })
    },
    createCategory(knex, newCategory, userId) {
        return knex('categories')
            .insert(newCategory)
            .returning('*')
            .where({ user_id: userId })
    },
}

module.exports = CategoriesService
