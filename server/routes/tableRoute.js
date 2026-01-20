const router = require("express").Router();
const TableController = require("../controller/tableController");
router
  .route("/table")
  .get(TableController.fetchTables)
  .post(TableController.createTable);
router
  .route("/table/:id")
  .patch(TableController.editTable)
  .delete(TableController.deleteTable);

module.exports = router;
