const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    server: {
      type: Schema.Types.ObjectId,
      ref: 'Server',
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: 'Channel',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Message = mongoose.model('Message', MessageSchema);
