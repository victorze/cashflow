const Transaction = require('../models/transaction')

const { mockTransactions } = require('./data')

function save(transaction) {
  const newTransaction = {
    date: transaction.date,
    account: transaction.accountId,
    category: transaction.categoryId,
    amount: transaction.amount,
    note: transaction.note,
    user: userId,
  }
  mockTransactions.push(newTransaction)
  console.log({ newTransaction })
}

async function getAll() {
  return await Transaction.find()
}

module.exports = {
  save,
  getAll,
}
