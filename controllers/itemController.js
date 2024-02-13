const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const Item = require('../models/item');
const Category = require('../models/category');
const User = require('../models/user');

exports.index = asyncHandler(async (req, res, nect) => {
  const items = await Item.find()
    .populate('category')
    .populate('collected_by')
    .exec();
  res.render('items', { title: 'Items', items });
});

exports.detail = asyncHandler(async (req, res, next) => {
  const [item] = await Promise.all([
    Item.findById(req.params.id)
      .populate('category')
      .populate('collected_by')
      .exec(),
  ]);

  if (item === null) {
    const err = new Error('Item not found');
    err.status = 404;
    return next(err);
  }

  res.render('item_detail', { title: 'Item', item });
});

exports.create_get = asyncHandler(async (req, res, next) => {
  const [categories, users] = await Promise.all([
    Category.find().exec(),
    User.find().exec(),
  ]);
  res.render('item_form', { title: 'Create an item', categories, users });
});

exports.create_post = [
  body('name', 'Item name must be longer than 3 characters.')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('about').escape(),
  body('collected_date', 'Invalid date')
    .optional({ values: 'falsy' })
    .isISO8601()
    .toDate(),
  body('category').trim().isLength({ min: 1 }).escape(),
  body('collected_by').trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const [categories, users] = await Promise.all([
        Category.find().exec(),
        User.find().exec(),
      ]);

      res.render('item_form', {
        title: 'Create an item',
        categories,
        users,
      });
    } else {
      await Item.create(
        new Item({
          name: req.body.name,
          info: req.body.about,
          category: req.body.category,
          collected_by: req.body.collected_by,
          collected_date: req.body.collected_date,
        })
      );
      res.redirect('/items');
    }
  }),
];

exports.update_get = asyncHandler(async (req, res, next) => {
  const [item, categories, users] = await Promise.all([
    Item.findById(req.params.id).exec(),
    Category.find().exec(),
    User.find().exec(),
  ]);

  res.render('item_form', {
    title: 'Update an item',
    categories,
    users,
    name: item.name,
    info: item.info,
    category: item.category,
    user: item.collected_by,
    collected_date: item.collected_date_iso,
  });
});

exports.update_post = [
  body('name', 'Item name must be longer than 3 characters.')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('about').escape(),
  body('collected_date', 'Invalid date')
    .optional({ values: 'falsy' })
    .isISO8601()
    .toDate(),
  body('category').trim().isLength({ min: 1 }).escape(),
  body('collected_by').trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const [item, categories, users] = await Promise.all([
        Item.findById(req.params.id).exec(),
        Category.find().exec(),
        User.find().exec(),
      ]);

      res.render('item_form', {
        title: 'Update an item',
        categories,
        users,
        name: item.name,
        info: item.info,
        category: item.category,
        user: item.collected_by,
        collected_date: item.collected_date_iso,
        errors: errors.array(),
      });
    } else {
      const newItem = new Item({
        name: req.body.name,
        info: req.body.about,
        category: req.body.category,
        collected_by: req.body.collected_by,
        collected_date: req.body.collected_date,
        _id: req.params.id,
      });
      await Item.findByIdAndUpdate(req.params.id, newItem);
      res.redirect(newItem.url);
    }
  }),
];

exports.delete_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec();
  if (item === null) {
    const err = new Error('Item not found');
    err.status = 404;
    next(err);
  }
  res.render('item_delete', { title: 'Delete item', item });
});

exports.delete_post = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec();

  if (item === null) {
    const err = new Error('Item not found');
    err.status = 404;
    next(err);
  }

  await Item.findByIdAndDelete(req.params.id);
  res.redirect('/items');
});
