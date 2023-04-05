const User = require("../models/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

// Controller function for signing up a new user
const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signUp(email, password);
    const token = await jwt.sign({ _id: user._id }, SECRET_KEY, {
      expiresIn: "3d",
    });
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function for logging in a user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = await jwt.sign({ _id: user._id }, SECRET_KEY, {
      expiresIn: "3d",
    });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    res.status(200).json({ message: "All users deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = {
  signup,
  login,
  getUsers,
  deleteAllUsers,
};
