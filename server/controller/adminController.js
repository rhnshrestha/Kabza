const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Admin } = require("../database/connect");

class AdminController {
  /**
   * Register a new Admin
   */
  static async registerAdmin(req, res) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existingAdmin = await Admin.findOne({ where: { email } });
      if (existingAdmin) {
        return res
          .status(400)
          .json({ message: "Username or email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = await Admin.create({
        username,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        message: "Admin registered successfully",
        newAdmin,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error registering admin" });
    }
  }

  /**
   * Login Admin and return JWT
   */
  static async loginAdmin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const admin = await Admin.findOne({ where: { email } });
      if (!admin || !(await bcrypt.compare(password, admin.password))) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { id: admin.id, email: admin.email },
        process.env.JWT_SECRET || "this-is-secret",
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        message: "Login successful",
        admin: { id: admin.id, username: admin.username, email: admin.email },
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Server error while logging in" });
    }
  }

  /**
   * Update Admin details
   */
  static async editAdmin(req, res) {
    try {
      const { id } = req.params;
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Missing credentials" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await Admin.update(
        { username, password: hashedPassword },
        { where: { id } }
      );

      return res.status(200).json({ message: "Admin updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error updating admin info" });
    }
  }

  /**
   * Fetch all Admins
   */
  static async getAdmin(req, res) {
    try {
      const data = await Admin.findAll();
      return res.status(200).json({ message: "list of admin", data });
    } catch (error) {
      return res.status(400).json({ message: "Error fetching admin" });
    }
  }
}

module.exports = AdminController;
