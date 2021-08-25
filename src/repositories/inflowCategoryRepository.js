const inflowCategories = ['Ahorros', 'Depósitos', 'Salario']

function getAll() {
  return inflowCategories
}

function get(id) {
  return inflowCategories[id]
}

module.exports = {
  getAll,
  get,
}
