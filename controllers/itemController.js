const asyncHandler = require('express-async-handler');

const Item = require('../models/item');

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
