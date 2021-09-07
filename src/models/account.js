const mongoose = require('mongoose')

const Transaction = require('../models/transaction')

const accountSchema = new mongoose.Schema(
  {
    description: {
      type: String,
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

accountSchema.pre('findOneAndDelete', async function (next) {
  await Transaction.deleteMany({ account: this.getQuery()._id })
  next()
})

module.exports = mongoose.model('Account', accountSchema)
