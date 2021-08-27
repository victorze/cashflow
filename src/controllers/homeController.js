const Transaction = require('../models/transaction')

async function index(req, res) {
  const currentDate = new Date()
  const [currentYear, currentMonth] = [
    currentDate.getFullYear(),
    currentDate.getMonth(),
  ]

  const [transactions, currentMonthTransactions] = await Promise.all([
    Transaction.find(),
    Transaction.find({
      date: {
        $gte: new Date(currentYear, currentMonth, 1),
        $lte: new Date(currentYear, currentMonth + 1, 1),
      },
    }),
  ])

  const balance = getBalance(transactions)
  const chartData = getChartData(currentMonthTransactions)

  console.log({ transactions })
  console.log({ balance, chartData })
  res.render('home', { balance, chartData })
}

function getBalance(transactions) {
  let inflow = 0
  let outflow = 0

  for (const transaction of transactions) {
    if (transaction.category.type === 'inflow') {
      inflow += transaction.amount
    } else if (transaction.category.type === 'outflow') {
      outflow += transaction.amount
    }
  }

  return inflow - outflow
}

function getChartData(transactions) {
  const chartData = new Map()
  const currentMonth = new Date().getMonth()

  for (const transaction of transactions) {
    if (
      transaction.category.type === 'outflow' &&
      new Date(transaction.date).getMonth() === currentMonth
    ) {
      const category = transaction.category.description
      if (chartData.has(category)) {
        chartData.set(category, chartData.get(category) + transaction.amount)
      } else {
        chartData.set(category, transaction.amount)
      }
    }
  }

  return Object.fromEntries(chartData)
}

module.exports = {
  index,
}
