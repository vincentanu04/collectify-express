const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  collected_date: { type: Date, default: Date.now },
  info: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  collected_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

ItemSchema.virtual('url').get(function () {
  return `/items/${this._id}`;
});

module.exports = mongoose.model('Item', ItemSchema);
