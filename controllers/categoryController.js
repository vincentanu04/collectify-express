const asyncHandler = require('express-async-handler');

const Category = require('../models/category');

exports.index = asyncHandler(async (req, res, next) => {
  const categories = await Category.find().exec();

  res.render('categories', { title: 'Categories', categories });
});
