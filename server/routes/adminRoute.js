const {createAdmin} = require("../controller/adminController");
const router = require("express").Router();
router.route("/admins").post(createAdmin);

module.exports = router;