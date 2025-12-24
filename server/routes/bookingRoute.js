const{createBooking, fetchBookings} = require("../controller/bookingFormController");
const { getBookingStatus } = require("../controller/bookingStatusController");
const router = require("express").Router();
router.route("/bookings").get(fetchBookings).post(createBooking);

router.route("/bookings/status").post(getBookingStatus);

module.exports = router;