// const{createBooking, fetchBookings} = require("../controller/bookingFormController");
// const { getBookingStatus } = require("../controller/bookingStatusController");
// const {verifyToken} = require('../middleware/auth.middleware');

// const router = require("express").Router();
// router.route("/bookings").get(fetchBookings).post(verifyToken, createBooking);

// router.route("/bookings/status").post(getBookingStatus);

// module.exports = router;

const router = require("express").Router();
const BookingController = require("../controller/bookingFormController");
const StatusController = require("../controller/bookingStatusController");

const { verifyToken } = require("../middleware/auth.middleware");

// Main Booking Routes
router
  .route("/bookings")
  .get(BookingController.fetchBookings)
  .post(verifyToken, BookingController.createBooking);

// Status Routes
router.route("/bookings/status").post(StatusController.getBookingStatus);

module.exports = router;
