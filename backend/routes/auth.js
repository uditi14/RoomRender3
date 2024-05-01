const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Route for user registration and login
router.post("/register", async (req, res) => {
  try {
    const { email, password, action } = req.body;

    // Check if the email exists for registration
    if (action === "register") {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    // For registration, create a new user instance and save to database
    if (action === "register") {
      const user = new User({ email, password });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      return res.status(201).json({ message: "User registered successfully" });
    }

    // For login, find user by email and verify password
    if (action === "login") {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "your_secret_key",
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
