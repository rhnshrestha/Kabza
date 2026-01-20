const { Booking, Table, BookingStatus } = require("../database/connect");

class StatusController {
  /**
   * Fetch booking status based on customer contact number
   */
  static async getBookingStatus(req, res) {
    try {
      const { contact } = req.body;

      if (!contact) {
        return res.status(400).json({ message: "Contact number is required" });
      }

      const bookings = await Booking.findAll({
        where: { contact },
        attributes: ["customer_name", "booking_date", "booking_time", "people"],
        include: [
          { 
            model: Table, 
            attributes: ["table_no"] 
          },
          { 
            model: BookingStatus, 
            attributes: ["status_name"] 
          }
        ],
      });

      if (bookings.length === 0) {
        return res.status(404).json({ message: "No booking found for this contact" });
      }

      return res.status(200).json({
        message: "Booking status fetched successfully",
        data: bookings,
      });
    } catch (err) {
      console.error("Status Fetch Error:", err);
      return res.status(500).json({ 
        message: "Error fetching booking status",
        error: err.message 
      });
    }
  }
}

module.exports = StatusController;