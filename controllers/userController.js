const asyncHandler = require('express-async-handler');

const User = require('../models/user');
const Item = require('../models/item');

exports.index = asyncHandler(async (req, res, next) => {
  const users = await User.find().exec();
  res.render('users', { title: 'Users', users });
});

exports.detail = asyncHandler(async (req, res, next) => {
  const [user, items] = await Promise.all([
    User.findById(req.params.id).exec(),
    Item.find({ collected_by: req.params.id }).exec(),
  ]);

  if (user === null) {
    const err = new Error('User not found');
    err.status = 404;
    return next(err);
  }

  res.render('user_detail', { title: 'User', user, items });
});
