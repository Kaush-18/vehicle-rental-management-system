const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle"
  },

  startDate: Date,

  endDate: Date,

  totalPrice: Number,

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }

}, { timestamps: true });

module.exports =
  mongoose.model("Booking", bookingSchema);