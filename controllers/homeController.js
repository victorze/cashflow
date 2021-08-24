const transactionRepository = require('../repositories/transactionRepository')
const outflowCategoryRepository = require('../repositories/outflowCategoryRepository')

function index(req, res, next) {
  const transactions = transactionRepository.getAll()
  const balance = getBalance(transactions)
  const chartData = getChartData(transactions)
  const month = getNameMonth(new Date().getMonth())

  console.log({ balance, month, chartData })
  res.render('home', { balance, month, chartData })
}

function getBalance(transactions) {
  let inflow = 0
  let outflow = 0

  for (const transaction of transactions) {
      if (transaction.type === 'inflow') {
        inflow += transaction.amount
      } else if (transaction.type === 'outflow') {
        outflow += transaction.amount
      }
  }

  return inflow - outflow
}

function getChartData(transactions) {
  const chartData = new Map()
  const currentMonth = new Date().getMonth()

  for (const transaction of transactions) {
    if (transaction.type === 'outflow' && new Date(transaction.createdAt).getMonth() === currentMonth) {
      const outflowCategories = outflowCategoryRepository.getAll()
      const category = outflowCategories[transaction.category]
      if (chartData.has(category)) {
        chartData.set(category, chartData.get(category) + transaction.amount)
      } else {
        chartData.set(category, transaction.amount)
      }
    }
  }

  return Object.fromEntries(chartData)
}

function getNameMonth(month) {
  const names = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
                      "agosto", "setiembre", "octubre", "noviembre", "diciembre"];
  return names[month]
}

module.exports = {
  index
}
