const {fetchTables, createTable, editTable, deleteTable} = require("../controller/tableController");
const router = require("express").Router();
router.route("/table").get(fetchTables).post(createTable);
router.route("/table/:id").patch(editTable).delete(deleteTable);

module.exports = router;