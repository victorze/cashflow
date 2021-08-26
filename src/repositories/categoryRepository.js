const { inflowCategories, outflowCategories } = require('./defaultData')

function getAll() {
  return inflowCategories.concat(outflowCategories)
}

function getInflowCategories() {
  return inflowCategories
}

function getOutflowCategories() {
  return outflowCategories
}

function get(id) {
  return inflowCategories[id]
}

module.exports = {
  getAll,
  getInflowCategories,
  getOutflowCategories,
  get,
}
