const transactions = [
  {
    createdAt: 1626959699000,
    account: '0',
    category: '6',
    amount: 100,
    note: '',
    type: 'outflow'
  },
  {
    createdAt: 1626959699000,
    account: '0',
    category: '6',
    amount: 600,
    note: '',
    type: 'inflow'
  },
  {
    createdAt: 1629589384099,
    account: '0',
    category: '5',
    amount: 12,
    note: '',
    type: 'outflow'
  },
  {
    createdAt: 1629589390148,
    account: '1',
    category: '2',
    amount: 500,
    note: '',
    type: 'inflow'
  },
  {
    createdAt: 1629589396131,
    account: '0',
    category: '4',
    amount: 14,
    note: '',
    type: 'outflow'
  },
  {
    createdAt: 1629589407171,
    account: '0',
    category: '5',
    amount: 90,
    note: 'Internet',
    type: 'outflow'
  }
]

function add(transaction) {
  const newTransaction = {
    createdAt: Date.now(),
    account: transaction.account,
    category: transaction.category,
    amount: +transaction.amount,
    note: transaction.note,
    type: transaction.type,
  }
  transactions.push(newTransaction)
  console.log('New transaction', newTransaction)
  console.log('number of transactions', transactions.length)
}

function getAll() {
  return transactions;
}

module.exports = {
  add,
  getAll
}
