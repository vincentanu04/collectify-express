const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

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

exports.create_get = asyncHandler(async (req, res, next) => {
  res.render('user_form', { title: 'Create a user' });
});

exports.create_post = [
  body('first_name', 'First name is required.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('family_name', 'Family name is required.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('about').escape(),
  body('age').escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('item_form', {
        title: 'Create an item',
        name: req.body.name,
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        about: req.body.about,
        age: req.body.age,
        errors: errors.array(),
      });
    } else {
      await User.create(
        new User({
          name: req.body.name,
          first_name: req.body.first_name,
          family_name: req.body.family_name,
          about: req.body.about,
          age: req.body.age,
        })
      );
      res.redirect('/users');
    }
  }),
];

exports.update_get = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).exec();
  res.render('user_form', {
    title: 'Update user',
    first_name: user.first_name,
    family_name: user.family_name,
    about: user.about,
    age: user.age,
  });
});

exports.update_post = [
  body('first_name', 'First name is required.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('family_name', 'Family name is required.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('about').escape(),
  body('age').escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('item_form', {
        title: 'Create an item',
        name: req.body.name,
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        about: req.body.about,
        age: req.body.age,
        errors: errors.array(),
      });
    } else {
      const newUser = new User({
        name: req.body.name,
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        about: req.body.about,
        age: req.body.age,
        _id: req.params.id,
      });
      console.log('update');
      await User.findByIdAndUpdate(req.params.id, newUser);
      res.redirect(newUser.url);
    }
  }),
];
