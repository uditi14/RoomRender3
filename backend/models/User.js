const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }], // Assuming 'Item' is the model for the items users can favorite
});

module.exports = mongoose.model("User", userSchema);
