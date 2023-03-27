const asyncHandler = require("express-async-handler");
const Ride = require("../models/rideModel");

const registerRide = asyncHandler(async (req, res) => {
  const { name, email, source,destination,rideFair } = req.body;

  if (!name || !email) {
    res.status(400);
    throw new Error("Pease provide all the details");
  }

  const ride = await Ride.create({
    name,
    email,
    source,
    destination,
    rideFair,
  });

  //sending back the response from the API to the user who is accesing the API.
  if (ride) {
    res.status(201).json({
      _id: ride._id,
      name: ride.name,
      email: ride.email,
      source: ride.source,                  
      destination: ride.destination,                  
      rideFair: ride.rideFair,                  
    });
  } else {
    throw new Error("Failed to create the user");
  }
});

const getAllRides = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

  const rides = await Ride.find();

  if (rides) {
    res.json(rides);
  } else {
    res.status(401);
    throw new Error("could not get rides");
  }
});

module.exports = { registerRide, getAllRides };