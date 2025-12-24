const { Booking, Table, BookingStatus } = require("../database/connect");

const getBookingStatus = async (req, res) => {
    try {
        // Change to req.body for POST or req.query for GET
        const { contact } = req.body; 

        if (!contact) {
            return res.status(400).json({ message: "contact no required" });
        }

        const bookings = await Booking.findAll({
            where: { contact },
            attributes: ["customer_name", "booking_date", "booking_time", "people"],
            include: [
                { model: Table, attributes: ["table_no"] },
                { model: BookingStatus, attributes: ["status_name"] }
            ],
        });

        if (bookings.length === 0) {
            return res.status(404).json({ message: "no booking found" });
        }

        // Send the data back!
        return res.json({
            message: "booking status fetched",
            data: bookings 
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "error fetching booking status" });
    }
}

module.exports = { getBookingStatus };