const BudgetAllotmentsService = {
    getBudgetAllotments(knex) {
        return knex.select('*').from('budget-allotments')
    },
    createBudgetAllotment(knex, newBudgetAllotment) {
        return knex('budget-allotments')
            .insert(newBudgetAllotment)
            .returning('*')
    },
    updateBudgetAllotment(knex, id, amountBudgeted) {
        return knex('budget-allotments')
            .where({ category: id })
            .update({ amountBudgeted })
    }
}

module.exports = BudgetAllotmentsService
