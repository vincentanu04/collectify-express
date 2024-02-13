const asyncHandler = require('express-async-handler');

const User = require('../models/user');

exports.index = asyncHandler(async (req, res, next) => {
  const users = await User.find().exec();
  res.render('users', { title: 'Users', users });
});
