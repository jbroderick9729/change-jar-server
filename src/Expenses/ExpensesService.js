const ExpensesService = {
    getExpenses(knex) {
        return knex.select('*')
            .from('expenses')
    },
    createExpense(knex, newExpense) {
        return knex.into('expenses')
            .insert(newExpense)
            .returning('*')
    },
}

module.exports = ExpensesService
