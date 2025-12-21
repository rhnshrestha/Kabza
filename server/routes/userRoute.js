const {registerUser, loginUser} = require("../controller/userController");
const router = require("express").Router();
router.route("/user/register").post(registerUser);
router.route("/user/login").post(loginUser);

module.exports = router;