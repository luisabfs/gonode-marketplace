const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Purchase = new mongoose.Schema({
  ad: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

Purchase.plugin(mongoosePaginate);

module.exports = mongoose.model('Purchase', Purchase);
