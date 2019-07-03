const BudgetAllotmentsService = {
    getBudgetAllotments(knex, userId) {
        return knex.select('*').from('budget-allotments').where({ user_id: userId })
    },
    createBudgetAllotment(knex, newBudgetAllotment) {
        return knex('budget-allotments')
            .insert(newBudgetAllotment)
            .returning('*')
    },
}

module.exports = BudgetAllotmentsService