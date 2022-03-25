const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChannelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    server: {
      type: Schema.Types.ObjectId,
      ref: 'Server',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Channel = mongoose.model('Channel', ChannelSchema);
