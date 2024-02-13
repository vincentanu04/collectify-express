const asyncHandler = require('express-async-handler');

const Category = require('../models/category');
const Item = require('../models/item');

exports.index = asyncHandler(async (req, res, next) => {
  const categories = await Category.find().exec();

  res.render('categories', { title: 'Categories', categories });
});

exports.detail = asyncHandler(async (req, res, next) => {
  const [category, items] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);

  if (category === null) {
    const err = new Error('Category not found');
    err.status = 404;
    return next(err);
  }

  res.render('category_detail', { title: 'Category', category, items });
});
