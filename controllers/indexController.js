const asyncHandler = require('express-async-handler');

const Category = require('../models/category');
const Item = require('../models/item');
const User = require('../models/user');

exports.index = asyncHandler(async (req, res, next) => {
  const [category_count, item_count, user_count] = await Promise.all([
    Category.countDocuments().exec(),
    Item.countDocuments().exec(),
    User.countDocuments().exec(),
  ]);
  res.render('home', {
    title: 'Collectify',
    category_count,
    item_count,
    user_count,
  });
});
