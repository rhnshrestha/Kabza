const {fetchTables, createTable, editTable} = require("../controller/tableController");
const router = require("express").Router();
router.route("/tables").get(fetchTables).post(createTable);
router.route("/tables/:id").patch(editTable);

module.exports = router;