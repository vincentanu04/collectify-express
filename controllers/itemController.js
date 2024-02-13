const asyncHandler = require('express-async-handler');

const Item = require('../models/item');

exports.index = asyncHandler(async (req, res, nect) => {
  const items = await Item.find()
    .populate('category')
    .populate('collected_by')
    .exec();
  res.render('items', { title: 'Items', items });
});
