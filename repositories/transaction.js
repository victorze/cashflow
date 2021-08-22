const transactions = [
  {
    createdAt: 1629589384099,
    account: '0',
    category: '5',
    amount: '12',
    note: '',
    type: 'outflow'
  },
  {
    createdAt: 1629589390148,
    account: '1',
    category: '2',
    amount: '14',
    note: '',
    type: 'inflow'
  },
  {
    createdAt: 1629589396131,
    account: '0',
    category: '4',
    amount: '14',
    note: '',
    type: 'outflow'
  },
  {
    createdAt: 1629589407171,
    account: '0',
    category: '6',
    amount: '90',
    note: 'Internet',
    type: 'outflow'
  }
]

function add(transaction) {
  transactions.push({ createdAt: Date.now(), ...transaction })
  console.log('New transaction', transaction)
  console.log('number of transactions', transactions.length)
}

function getAll() {
  return transactions;
}

module.exports = {
  add,
  getAll
}
