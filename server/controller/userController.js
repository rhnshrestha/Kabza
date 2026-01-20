const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require("../database/connect");

class UserController {
  /**
   * Register a new regular user
   */
  static async registerUser(req, res) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Username or email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        message: "User registered successfully",
        newUser, // Note: In production, consider not sending the password back
      });
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({ message: "Error registering user" });
    }
  }

  /**
   * Authenticate user and issue JWT
   */
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || "this-is-secret",
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Server error logging in" });
    }
  }
}

module.exports = UserController;