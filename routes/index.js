const express = require('express')

const transactionRepository = require('../repositories/transaction')
const transactionController  = require('../controllers/transaction')
const { validateTransaction, outflowCategories }  = require('../controllers/transaction')


const router = express.Router()

router.get('/', (req, res, next) => {
  const chartData = getChartData(transactionRepository.getAll())
  console.log(chartData)
  const currentMonth = new Date().getMonth()
  const month = getNameMonth(currentMonth)
  console.log({month})
  res.render('index', { chartData, month })
})

function getChartData(transactions) {
  const chartData = new Map()
  const currentMonth = new Date().getMonth()

  for (const transaction of transactions) {
    if (transaction.type === 'outflow' && new Date(transaction.createdAt).getMonth() === currentMonth) {
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

router.get('/transaction', transactionController.index)
router.post('/transaction', validateTransaction, transactionController.store)

module.exports = router
