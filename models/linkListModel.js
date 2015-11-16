var mongoose = require('mongoose');

var LinkListSchema = new mongoose.Schema({
  name: String,
  date: {type: Date, default: Date.now},
  href: String,
  priority: {type: Number, default: 2},
  desc: String,
  userId: String,
  category: String
});

module.exports = mongoose.model('LinkList', LinkListSchema);