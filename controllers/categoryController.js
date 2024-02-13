const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

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

exports.create_get = asyncHandler(async (req, res, next) => {
  res.render('category_form', { title: 'Create a category' });
});

exports.create_post = [
  body('name', 'Category name must be longer than 3 characters.')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Create a category',
        name: req.body.name,
        errors: errors.array(),
      });
    } else {
      await Category.create(new Category({ name: req.body.name }));
      res.redirect('/categories');
    }
  }),
];
