const { accounts } = require('./defaultData')

function getAll() {
  return accounts
}

module.exports = {
  getAll,
}
