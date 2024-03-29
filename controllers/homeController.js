const Transaction = require('../models/transaction')

const index = async (req, res) => {
  const currentDate = new Date()
  const [currentYear, currentMonth] = [
    currentDate.getFullYear(),
    currentDate.getMonth(),
  ]

  const [transactions, currentMonthTransactions] = await Promise.all([
    Transaction.find({ user: req.user._id }),
    Transaction.find({
      createdAt: {
        $gte: new Date(currentYear, currentMonth, 1),
        $lte: new Date(currentYear, currentMonth + 1, 1),
      },
      user: req.user._id,
    }),
  ])

  const balance = transactions.reduce(
    (a, b) => (b.category.type === 'inflow' ? a + b.amount : a - b.amount),
    0
  )
  const chartData = getChartData(currentMonthTransactions)

  res.render('home', { balance, chartData })
}

const getChartData = (transactions) => {
  const chartData = new Map()

  for (const transaction of transactions) {
    if (transaction.category.type === 'outflow') {
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

module.exports = { index }
