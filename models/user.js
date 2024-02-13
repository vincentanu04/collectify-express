const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  family_name: { type: String, required: true },
  about: { type: String },
  age: { type: Number },
});

UserSchema.virtual('name').get(function () {
  return `${this.first_name} ${this.family_name}`;
});
module.exports = mongoose.model('User', UserSchema);
