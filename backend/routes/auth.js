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

router.post("/favorites/add", async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if item already exists in favorites
    if (!user.favorites.includes(itemId)) {
      user.favorites.push(itemId);
      await user.save();
    }

    res.status(200).json({ message: "Item added to favorites" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Remove item from favorites
router.post("/favorites/remove", async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove item from favorites
    user.favorites = user.favorites.filter((fav) => fav !== itemId);
    await user.save();

    res.status(200).json({ message: "Item removed from favorites" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
