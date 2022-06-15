function validateTransaction(req, res, next) {
  const errors = []

  if (!req.body.account) {
    errors.push('Debe seleccionar una cuenta')
  }

  if (!req.body.category) {
    errors.push('Debe seleccionar una categoría')
  }

  if (isNaN(req.body.amount) || !req.body.amount) {
    errors.push('Ingrese un monto válido')
  }

  if (errors.length) {
    req.flash('error', errors)
    res.redirect('back')
  } else {
    next()
  }
}

function validateRegister(req, res, next) {
  const errors = []

  if (!req.body.name || !req.body.email || !req.body.password) {
    errors.push('Los campos nombre, email y contraseña son obligatorios')
  }

  if (req.body.password && req.body.password.length < 4) {
    errors.push('La contraseña debe contener 4 caracteres como mínimo')
  }

  if (req.body.password && req.body.confirmPassword !== req.body.password) {
    errors.push('Las contraseñas no coinciden')
  }

  if (errors.length) {
    req.flash('error', errors)
    res.redirect('back')
  } else {
    next()
  }
}

module.exports = {
  validateTransaction,
  validateRegister,
}
