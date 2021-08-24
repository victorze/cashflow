const outflowCategories = [
  'Automovil',
  'Casa',
  'Comida',
  'Comunicaciones',
  'Deportes',
  'Entretenimiento',
  'Facturas',
  'Higiene',
  'Mascotas',
  'Regalos',
  'Restaurante',
  'Ropa',
  'Salud',
  'Taxi',
  'Transporte',
]

function getAll() {
  return outflowCategories
}

function get(id) {
  return outflowCategories[id]
}

module.exports = {
  getAll,
  get,
}
