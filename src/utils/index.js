function getNameMonth(month) {
  const names = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'setiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ]
  return names[month]
}

function amountFormat(amount, fractionDigits = 2) {
  const option = {
    style: 'decimal',
    minimumFractionDigits: fractionDigits,
  }

  return new Intl.NumberFormat('en-US', option).format(amount)
}

module.exports = {
  getNameMonth,
  amountFormat,
}
