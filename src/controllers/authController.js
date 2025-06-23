const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const { name, email, username, phoneNumber, password, role } = req.body;

    // Check for duplicate email, username, or phone number
    const existingUser = await User.findOne({
      $or: [{ email }, { username }, { phoneNumber }]
    });
    if (existingUser) {
      return res.status(409).json({
        error: "Account already exists",
        nextAction: "Login",
        username,
        email,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      username,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "Registration successful", userId: newUser._id });
  } catch (error) {
    next(error);
  }
};

/*
const login = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    // Find user by email OR username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or username" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credential" });
    }

    // Create JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
*/


const login = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    // Must provide either an email or a username
    if (!email && !username) {
      return res.status(400).json({ error: "Please provide an email or username" });
    }

    // Find user by email or username
    const user = await User.findOne(
      email ? { email } : { username }
    );
    if (!user) {
      return res.status(400).json({ error: "Invalid email or username" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Create JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};