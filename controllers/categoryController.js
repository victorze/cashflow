const Category = require('../models/category')

const index = async (req, res) => {
  const categories = await Category.find({ user: req.user._id })

  const inflowCategories = categories.filter(
    (category) => category.type === 'inflow'
  )
  const outflowCategories = categories.filter(
    (category) => category.type === 'outflow'
  )

  res.render('categories/index', { inflowCategories, outflowCategories })
}

const store = async (req, res) => {
  req.body.user = req.user._id
  await Category.create(req.body)
  req.flash('success', 'La categoría fue creada correctamente')
  res.redirect('/categories')
}

const update = async (req, res) => {
  await Category.findByIdAndUpdate(req.params.id, req.body)
  req.flash('success', 'La categoría fue actualizada correctamente')
  res.redirect('/categories')
}

const destroy = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id)
  req.flash('success', 'La categoría fue eliminada')
  res.redirect('/categories')
}

module.exports = { index, store, update, destroy }
