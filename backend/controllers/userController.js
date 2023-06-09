const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password,walletAddress } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Pease provide all the details");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    walletAddress
  });

  //sending back the response from the API to the user who is accesing the API.
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      walletAddress: user.walletAddress,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Failed to create the user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      walletAddress: user.walletAddress,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

module.exports = { registerUser, authUser };