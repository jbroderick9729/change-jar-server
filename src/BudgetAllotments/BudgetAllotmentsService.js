const BudgetAllotmentsService = {
    getBudgetAllotments(knex, userId) {
        return knex.select('*').from('budget-allotments').where({ user_id: userId })
    },
    createBudgetAllotment(knex, newBudgetAllotment) {
        return knex('budget-allotments')
            .insert(newBudgetAllotment)
            .returning('*')
    },
    // updateBudgetAllotment(knex, category, amount) {
    //     // const newAmount = parseInt(amount)
    //     return knex('budget-allotments')
    //         .where({ category: category })
    //         .update({ amount: amount })
    //         .returning('*')
    // }
}

module.exports = BudgetAllotmentsService