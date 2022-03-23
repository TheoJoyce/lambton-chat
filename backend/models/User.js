const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    firstName: {
        type: String,
        required: "First Name is required!",
    },
    lastName: {
        type: String,
        required: "Last Name is required!",
      },
    title: {
        type: String
    },
    email: {
        type: String,
        required: "Email is required!",
    },
    password: {
        type: String,
        required: "Password is required!",
    },
    serverID: {
        type: Schema.Types.ObjectId, ref: 'Server'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("User", userSchema);