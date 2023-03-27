const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

const rideSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    rideFair: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

//add methods to models in this manner


const Ride = mongoose.model("Ride", rideSchema);

module.exports = Ride;