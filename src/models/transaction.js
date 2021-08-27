const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  account: {
    type: mongoose.Schema.ObjectId,
    ref: 'Account',
    required: true,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  note: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
})

function autopopulate(next) {
  this.populate('account')
  this.populate('category')
  next()
}

transactionSchema.pre('find', autopopulate)
transactionSchema.pre('findOne', autopopulate)

module.exports = mongoose.model('Transaction', transactionSchema)
