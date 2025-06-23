/*
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const { name, email, username, phoneNumber, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }, { phoneNumber }],
    });
    if (existingUser) {
      return res.status(409).json({
        error: "Account already exists",
        existingField:
          existingUser.email === email
            ? "email"
            : existingUser.username === username
            ? "username"
            : "phoneNumber",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name,
      email,
      username,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    // identifier can be email or username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Sign JWT
    const token = jwt.sign(
      { id: user._id, role: user.role, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "12h" } // You can adjust as needed
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


const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ======================= AUTH METHODS =======================

// REGISTER
const register = async (req, res, next) => {
  try {
    const { name, email, username, phoneNumber, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }, { phoneNumber }],
    });
    if (existingUser) {
      return res.status(409).json({
        error: "Account already exists",
        existingField:
          existingUser.email === email
            ? "email"
            : existingUser.username === username
            ? "username"
            : "phoneNumber",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name,
      email,
      username,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

// LOGIN
const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    // identifier can be email or username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Sign JWT
    const token = jwt.sign(
      { id: user._id, role: user.role, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );
    res.json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    next(error);
  }
};

// ======================= USER CRUD METHODS =======================

// GET ALL USERS
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// GET USER BY ID
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// CREATE USER
const createUser = async (req, res, next) => {
  try {
    const { name, email, username, phoneNumber, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      username,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    next(error);
  }
};

// UPDATE USER
const updateUser = async (req, res, next) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User updated successfully", user: updated });
  } catch (error) {
    next(error);
  }
};

// DELETE USER
const deleteUser = async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};