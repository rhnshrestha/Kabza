const {fetchTables, createTable, editTable, deleteTable} = require("../controller/tableController");
const router = require("express").Router();
router.route("/tables").get(fetchTables).post(createTable);
router.route("/tables/:id").patch(editTable).delete(deleteTable);

module.exports = router;