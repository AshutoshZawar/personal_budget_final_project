const mongoose = require("mongoose");

const ExpenceModel = mongoose.Schema({
  user_id: String,
  title: String,
  value: Number,
  bg_color: String,
  border_color: String,
  published: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Expences", ExpenceModel);
