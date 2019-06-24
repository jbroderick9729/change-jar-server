//for now limit getExpenses to current month?
const date = new Date()
const firstDayOfCurrentMonth = new Date(date.getFullYear(), date.getMonth(), 1)

const ExpensesService = {
    getExpenses(knex) {
        return knex.select('*')
            .from('expenses')
            .where('date', '>', firstDayOfCurrentMonth)
    },
    getExpensesByCategory(knex, category) {
        return knex.select('*')
            .from('expenses')
            .where('date', '>', firstDayOfCurrentMonth)
            .andWhere({ category })
    },
    createExpense(knex, newExpense) {
        return knex.into('expenses')
            .insert(newExpense)
            .returning('*')
    },
}

module.exports = ExpensesService
