const{createBooking, fetchBookings} = require("../controller/bookingFormController");
const { getBookingStatus } = require("../controller/bookingStatusController");
const {verifyToken} = require('../middleware/auth.middleware');

const router = require("express").Router();
router.route("/bookings").get(fetchBookings).post(verifyToken, createBooking);

router.route("/bookings/status").post(getBookingStatus);

module.exports = router;