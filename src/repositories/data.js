const accounts = [
  {
    code: 101,
    description: 'Efectivo',
  },
  {
    code: 102,
    description: 'Tarjeta de pago',
  },
]

const inflowCategories = [
  {
    code: 101,
    description: 'Ahorros',
    type: 'inflow',
  },
  {
    code: 102,
    description: 'Depósitos',
    type: 'inflow',
  },
  {
    code: 103,
    description: 'Salario',
    type: 'inflow',
  },
]

const outflowCategories = [
  {
    code: 201,
    description: 'Automovil',
    type: 'outflow',
  },
  {
    code: 202,
    description: 'Casa',
    type: 'outflow',
  },
  {
    code: 203,
    description: 'Comida',
    type: 'outflow',
  },
  {
    code: 204,
    description: 'Comunicaciones',
    type: 'outflow',
  },
  {
    code: 205,
    description: 'Deportes',
    type: 'outflow',
  },
  {
    code: 206,
    description: 'Entretenimiento',
    type: 'outflow',
  },
  {
    code: 207,
    description: 'Facturas',
    type: 'outflow',
  },
  {
    code: 208,
    description: 'Higiene',
    type: 'outflow',
  },
  {
    code: 209,
    description: 'Mascotas',
    type: 'outflow',
  },
  {
    code: 210,
    description: 'Regalos',
    type: 'outflow',
  },
  {
    code: 211,
    description: 'Restaurante',
    type: 'outflow',
  },
  {
    code: 212,
    description: 'Ropa',
    type: 'outflow',
  },
  {
    code: 213,
    description: 'Salud',
    type: 'outflow',
  },
  {
    code: 214,
    description: 'Taxi',
    type: 'outflow',
  },
  {
    code: 215,
    description: 'Transporte',
    type: 'outflow',
  },
]

const mockTransactions = [
  {
    date: 1629589390148,
    account: {
      code: 101,
      description: 'Efectivo',
    },
    category: {
      code: 103,
      description: 'Salario',
      type: 'inflow',
    },
    amount: 500,
    note: '',
  },
  {
    date: 1629589384099,
    account: {
      code: 101,
      description: 'Efectivo',
    },
    category: {
      code: 203,
      description: 'Comida',
      type: 'outflow',
    },
    amount: 30.8,
    note: '',
  },
  {
    date: 1629589396131,
    account: {
      code: 101,
      description: 'Efectivo',
    },
    category: {
      code: 206,
      description: 'Entretenimiento',
      type: 'outflow',
    },
    amount: 41,
    note: '',
  },
  {
    date: 1629589407171,
    account: {
      code: 101,
      description: 'Efectivo',
    },
    category: {
      code: 209,
      description: 'Mascotas',
      type: 'outflow',
    },
    amount: 70.5,
    note: 'Internet',
  },
]

module.exports = {
  accounts,
  inflowCategories,
  outflowCategories,
  mockTransactions,
}