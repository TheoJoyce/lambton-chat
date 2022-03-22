const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = Server = mongoose.model('Server', ServerSchema);
