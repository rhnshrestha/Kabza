import { useState } from "react";
import axios from "axios";
import { bookingValidation } from "../validations/bookingValidation";
import { getToken } from "../utils/auth";
import { Link } from "react-router-dom";


const errorStyle = {
  color: "red",
  fontSize: "16px",
};
export default function BookingFormPage() {
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    customer_name: "",
    contact: "",
    email: "",
    booking_date: "",
    booking_time: "",
    people: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "people" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = bookingValidation.safeParse(formData);

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      setError(fieldErrors);
      return;
    }

    setError({});

    try {
      const token = getToken();
      const response = await axios.post(
        "http://localhost:8808/api/bookings",
        formData,
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Booking submitted successfully!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to submit booking");
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-6 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/table.jpg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-3xl">
        <div className="bg-black/40 backdrop-blur-xl p-10 md:p-12 rounded-3xl shadow-2xl border border-white/10 text-white">
          
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold tracking-tight mb-3">
              Book a Table <span className="text-orange-500">🍽️</span>
            </h1>
            <p className="text-gray-400 text-sm">
              Secure your spot in seconds.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Full Name - Span 2 */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-300 text-sm font-medium mb-2 ml-1">Full Name</label>
              <input
                type="text"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
              />
              {error.customer_name && <span className="text-red-400 text-xs mt-1 ml-1">{error.customer_name[0]}</span>}
            </div>

            {/* Contact */}
            <div className="flex flex-col">
              <label className="text-gray-300 text-sm font-medium mb-2 ml-1">Contact Number</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                placeholder="98XXXXXXXX"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
              />
              {error.contact && <span className="text-red-400 text-xs mt-1 ml-1">{error.contact[0]}</span>}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-gray-300 text-sm font-medium mb-2 ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
              />
              {error.email && <span className="text-red-400 text-xs mt-1 ml-1">{error.email[0]}</span>}
            </div>

            {/* Date */}
            <div className="flex flex-col">
              <label className="text-gray-300 text-sm font-medium mb-2 ml-1">Booking Date</label>
              <input
                type="date"
                name="booking_date"
                value={formData.booking_date}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all "
              />
              {error.booking_date && <span className="text-red-400 text-xs mt-1 ml-1">{error.booking_date[0]}</span>}
            </div>

            {/* Time */}
            <div className="flex flex-col">
              <label className="text-gray-300 text-sm font-medium mb-2 ml-1">Booking Time</label>
              <input
                type="time"
                name="booking_time"
                value={formData.booking_time}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all "
              />
              {error.booking_time && <span className="text-red-400 text-xs mt-1 ml-1">{error.booking_time[0]}</span>}
            </div>

            {/* People */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-300 text-sm font-medium mb-2 ml-1">Number of People</label>
              <input
                type="number"
                name="people"
                value={formData.people}
                onChange={handleChange}
                min="1"
                required
                placeholder="e.g. 4"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
              />
              {error.people && <span className="text-red-400 text-xs mt-1 ml-1">{error.people[0]}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="md:col-span-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-2xl shadow-lg transform active:scale-[0.98] transition-all duration-200 mt-4 cursor-pointer"
            >
              Confirm Reservation
            </button>
          </form>

          <div className="flex justify-center gap-6 mt-8">
            <Link
              to="/booking-status"
              className="text-gray-400  hover:text-orange-500 transition decoration-2 underline-offset-4 text-2xl"
            >
              Check Status
            </Link> 
          </div>

           <div className="text-center mt-6">
           <Link to="/" className="text-gray-400 text-xs uppercase tracking-widest hover:text-white transition">
             ← Back to Home
           </Link>
          </div>

        </div>
      </div>
    </div>
  );
}