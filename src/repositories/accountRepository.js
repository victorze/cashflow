const { accounts } = require('./data')
const Account = require('../models/account')

async function getAll() {
  return await Account.find()
}

module.exports = {
  getAll,
}
