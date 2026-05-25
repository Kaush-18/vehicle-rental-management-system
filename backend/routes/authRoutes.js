const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// ================= REGISTER =================

router.post("/register", async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    // Check fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    // Existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "Registration successful ✅",
      user,
    });

  } catch (error) {

    console.log("REGISTER ERROR:");
    console.log(error);

    res.status(500).json({
      error: error.message,
    });

  }
});


// ================= LOGIN =================

router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful ✅",
      token,
      user,
    });

  } catch (error) {

    console.log("LOGIN ERROR:");
    console.log(error);

    res.status(500).json({
      error: error.message,
    });

  }
});

module.exports = router;