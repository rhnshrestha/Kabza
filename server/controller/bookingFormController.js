const { Booking,Table } = require('../database/connect');
const { Op } = require("sequelize");

class BookingController {
  /**
   * Get all bookings from the database
   */
  static async fetchBookings(req, res) {
    try {
      // We use 'include' to bring in the associated Table data
    const data = await Booking.findAll({
      include: [
        {
          model: Table, 
          attributes: ['table_no'], // We only need the table name/number
        }
      ],
      order: [['createdAt', 'DESC']] // Optional: show newest bookings first
    });
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

  static async createBooking(req, res) {
  try {
    const { customer_name, contact, booking_date, booking_time, people } = req.body;

    // 1. Validation
    if (!customer_name || !contact || !booking_date || !booking_time || !people) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // 2. Find best available table (BEST FIT)
    const table = await Table.findOne({
      where: {
        status: "available",
        capacity: {
          [Op.gte]: people
        }
      },
      order: [["capacity", "ASC"]] // exact or smallest possible larger table
    });

    // 3. If no table found
    if (!table) {
      return res.status(400).json({
        message: "No available table for the given number of people"
      });
    }

    // 4. Create booking
    const newBooking = await Booking.create({
      customer_name,
      contact,
      booking_date,
      booking_time,
      people,
      table_id: table.id,
      user_id: req.user.id,
      status_id: 3 // Pending
    });

    // 5. Mark table as unavailable
    await table.update({ status: "unavailable" });

    return res.status(201).json({
      message: "Booking created successfully and table assigned",
      booking: newBooking,
      table_assigned: table.table_no
    });

  } catch (error) {
    console.error("Create error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}

  static async updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { status_id } = req.body;

    // Allow only valid statuses
    if (![1, 2].includes(status_id)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // If cancelling → release table
    if (status_id === 2 && booking.table_id) {
      await Table.update(
        { status: "available" },
        { where: { id: booking.table_id } }
      );
    }

    await booking.update({ status_id });

    return res.json({
      message: "Status updated successfully",
      booking
    });

  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ message: "Server error" });
  }
}


}

module.exports = BookingController;