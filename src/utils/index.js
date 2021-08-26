function getMonthName(date) {
  return new Intl.DateTimeFormat('es-PE', { month: 'long' }).format(date)
}

function amountFormat(amount, fractionDigits = 2) {
  const option = {
    style: 'decimal',
    minimumFractionDigits: fractionDigits,
  }

  return new Intl.NumberFormat('en-US', option).format(amount)
}

module.exports = {
  getMonthName,
  amountFormat,
}
