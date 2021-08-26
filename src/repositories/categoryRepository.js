const { inflowCategories, outflowCategories } = require('./data')
const Category = require('../models/category')


async function getAll() {
  return await Category.find()
}

async function getInflows() {
  const categories = await getAll()
  return categories.filter((category) => category === 'inflow')
}

async function getOutflows() {
  const categories = await getAll()
  return categories.filter((category) => category === 'outflow')
}

function get(id) {
  return inflowCategories[id]
}

module.exports = {
  getAll,
  getInflows,
  getOutflows,
  get,
}
