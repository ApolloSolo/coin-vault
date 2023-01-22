const { Schema, model } = require("mongoose");

const coinSchema = new Schema({
  uuid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  iconUrl: {
    type: String
  },
  color: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  updated_at: {
    type: Date,
    required: true,
  },
});

const Coin = model("Coin", coinSchema);

module.exports = Coin;
