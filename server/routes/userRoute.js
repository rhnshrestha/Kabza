const express = require("express");
const UserController = require("../controller/userController");
const router = express.Router();

router.route("/user/register")
  .post(UserController.registerUser);

router.route("/user/login")
  .post(UserController.loginUser);

module.exports = router;