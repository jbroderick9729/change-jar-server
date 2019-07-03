//for now limit getExpenses to current month?
const date = new Date()
const firstDayOfCurrentMonth = new Date(date.getFullYear(), date.getMonth(), 1)

const ExpensesService = {
    getExpenses(knex, userId) {
        return knex('expenses')
            .join('categories', 'expenses.category', '=', 'categories.id')
            .select('expenses.id', 'expenses.date', 'expenses.amount', 'expenses.created_at', 'expenses.modified_at', 'expenses.category', 'expenses.description', 'categories.category_name')
            .where('date', '>', firstDayOfCurrentMonth)
            .andWhere('expenses.user_id', '=', userId)
    },
    createExpense(knex, newExpense, userId) {
        return knex.into('expenses')
            .insert(newExpense)
            .returning('*')
            .where({ user_id: userId })
    },
}

module.exports = ExpensesService

