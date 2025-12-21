const {registerAdmin, loginAdmin, editAdmin, getAdmin} = require("../controller/adminController");
const router = require("express").Router();
router.route("/admin").get(getAdmin);
router.route("/admin/register").post(registerAdmin);
router.route("/admin/login").post(loginAdmin);
router.route("/admin/:id").patch(editAdmin);

module.exports = router;