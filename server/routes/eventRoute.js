const router = require("express").Router();
const EventController = require("../controller/eventController");

router.route("/event")
  .post(EventController.createEvent)
  .get(EventController.getEvents);
  
router.route("/event/:id")
  .delete(EventController.deleteEvent)
  .patch(EventController.editEvent);

module.exports = router;
