const BudgetAllotmentsService = {
    getBudgetAllotments(knex) {
        return knex.select('*').from('budget-allotments')
    },
    createBudgetAllotment(knex, newBudgetAllotment) {
        return knex('budget-allotments')
            .insert(newBudgetAllotment)
            .returning('*')
    },
}

module.exports = BudgetAllotmentsService
