const { Booking } = require('../database/connect');

class BookingController {
  /**
   * Get all bookings from the database
   */
  static async fetchBookings(req, res) {
    try {
      const data = await Booking.findAll();
      return res.status(200).json({
        message: "Bookings fetched successfully",
        bookings: data
      });
    } catch (error) {
      console.error("Fetch error:", error);
      return res.status(500).json({
        message: "Error fetching bookings",
        error: error.message
      });
    }
  }

  /**
   * Create a new booking linked to the authenticated user
   */
  static async createBooking(req, res) {
    try {
      const { customer_name, contact, booking_date, booking_time, people } = req.body;

      // 1. Validation
      if (!customer_name || !contact || !booking_date || !booking_time || !people) {
        return res.status(400).json({
          message: "All fields are required"
        });
      }

      // 2. Creation
      // Note: req.user.id comes from your verifyToken middleware
      const newBooking = await Booking.create({
        customer_name,
        contact,
        booking_date,
        booking_time,
        people,
        table_id: null,
        user_id: req.user.id, 
        status_id: 3 // Assuming 3 is 'Pending'
      });

      return res.status(201).json({
        message: "Booking form submitted successfully! status:pending",
        booking: newBooking
      });
    } catch (error) {
      console.error("Create error:", error);
      return res.status(500).json({
        message: "Server error",
        error: error.message
      });
    }
  }
}

module.exports = BookingController;