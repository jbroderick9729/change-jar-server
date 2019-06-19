const ExpensesService = {
    getExpenses(knex) {
        return knex.select('*').from('expenses')
    }
}

module.exports = ExpensesService
