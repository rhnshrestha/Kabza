const{createBooking, fetchBookings} = require("../controller/bookingFormController");
const router = require("express").Router();
router.route("/bookings").get(fetchBookings).post(createBooking);

module.exports = router;