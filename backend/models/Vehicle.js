const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  brand: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  },

  pricePerDay: {
    type: Number,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  image: {
    type: String
  }

});

module.exports =
  mongoose.model("Vehicle", vehicleSchema);