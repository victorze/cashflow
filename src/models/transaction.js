const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  note: String,
  account: {
    type: mongoose.Schema.ObjectId,
    ref: 'Account',
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
})

module.exports = mongoose.model('Transaction', transactionSchema)
