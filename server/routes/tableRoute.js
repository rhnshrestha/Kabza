const {fetchTables, createTable} = require("../controller/tableController");
const router = require("express").Router();
router.route("/tables").get(fetchTables).post(createTable);

module.exports = router;