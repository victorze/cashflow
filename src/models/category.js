const mongoose = require('mongoose')
const Transaction = require('../models/transaction')

const categorySchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['inflow', 'outflow'],
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

categorySchema.pre('findOneAndDelete', async function (next) {
  await Transaction.deleteMany({ category: this.getQuery()._id })
  next()
})

module.exports = mongoose.model('Category', categorySchema)
