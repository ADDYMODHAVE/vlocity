// server/controllers/userController.js
const { findOne } = require("../models/Poll");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ $or: [{ email }, { username }] });

  if (userExists) {
    res.status(200).json({ message: "User already exists" });
    return;
  }
  const user = await User.create({ username, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(200).json({ message: "Invalid user data" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(200).json({ message: "Invalid email or password" });
  }
};

exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).populate("createdPolls").populate("votedPolls");

  if (user) {
    res.json(user);
  } else {
    res.status(200).json({ message: "User not found" });
  }
};
