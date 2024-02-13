const mongoose = require('mongoose');
const { DateTime } = require('luxon');

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

ItemSchema.virtual('collected_date_formatted').get(function () {
  return DateTime.fromJSDate(this.collected_date).toLocaleString(
    DateTime.DATE_MED
  );
});

module.exports = mongoose.model('Item', ItemSchema);
