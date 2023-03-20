const env = require('../config/env')

const info = (...params) => {
  if (env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

const debug = (...params) => {
  if (env.NODE_ENV == 'development') {
    console.log(...params)
  }
}

const error = (...params) => {
  if (env.NODE_ENV !== 'test') {
    console.error(...params)
  }
}

module.exports = { info, debug, error }
