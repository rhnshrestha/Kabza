const {Booking, Table, BookingStatus} = require('../database/connect');

const fetchBookings = async(req,res)=>{
    const datas = await Booking.findAll();

    res.json({
        message: "bookings fetched successfully",
        datas
    })
}

const createBooking = async (req, res)=>{
    try {
        const {customer_name, contact, booking_date, booking_time, people} = req.body;
        if(!customer_name || !contact || !booking_date || !booking_time || !people){
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const newBooking = await Booking.create({
            customer_name,
            contact,
            booking_date,
            booking_time,
            people,
            table_id: null,
            status_id: 1
        });

        res.status(201).json({
            message: "booking form submitted successfully! status:pending",
            booking: newBooking
        })
    }
    catch(error){
        res.status(500).json({
            message: "server error",
            error: error.message
        });
    }
}

module.exports = {createBooking, fetchBookings}