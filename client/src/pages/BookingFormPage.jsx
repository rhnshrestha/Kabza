import { useState } from "react";
import axios from "axios";
import { bookingValidation } from "../validations/bookingValidation";
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
      const response = await axios.post(
        "http://localhost:8808/api/bookings",
        formData
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
      className="min-h-screen bg-black flex items-center justify-center p-6"
      style={{
        backgroundImage: "url('/table.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-3xl p-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-3 tracking-tight">
          Book a Table 🍽️
        </h1>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Fill the form to complete your reservation.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="flex flex-col col-span-2">
            <label className="text-gray-800 font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-gray-800 
            focus:ring-2 focus:ring-black transition-all outline-none"
            />
            <span style={errorStyle}>{error.customer_name?.[0]}</span>
          </div>

          {/* Contact */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-medium mb-1">
              Contact Number
            </label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              placeholder="98XXXXXXXX"
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-gray-800 
            focus:ring-2 focus:ring-black transition-all outline-none"
            />
            <span style={errorStyle}>{error.contact?.[0]}</span>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-gray-800 
            focus:ring-2 focus:ring-black transition-all outline-none"
            />
            <span style={errorStyle}>{error.email?.[0]}</span>
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-medium mb-1">
              Booking Date
            </label>
            <input
              type="date"
              name="booking_date"
              value={formData.booking_date}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-gray-800 
            focus:ring-2 focus:ring-black transition-all outline-none"
            />
            <span style={errorStyle}>{error.booking_date?.[0]}</span>
          </div>

          {/* Time */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-medium mb-1">
              Booking Time
            </label>
            <input
              type="time"
              name="booking_time"
              value={formData.booking_time}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-gray-800 
            focus:ring-2 focus:ring-black transition-all outline-none"
            />
            <span style={errorStyle}>{error.booking_time?.[0]}</span>
          </div>

          {/* People */}
          <div className="flex flex-col col-span-2">
            <label className="text-gray-800 font-medium mb-1">
              Number of People
            </label>
            <input
              type="number"
              name="people"
              value={formData.people}
              onChange={handleChange}
              min="1"
              required
              placeholder="e.g. 4"
              className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-gray-800 
            focus:ring-2 focus:ring-black transition-all outline-none"
            />
            <span style={errorStyle}>{error.people?.[0]}</span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="col-span-2 bg-black text-white py-3 rounded-xl text-lg font-semibold 
          shadow-md hover:bg-gray-900 active:scale-[0.97] transition-all"
          >
            Confirm Booking
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6 hover:text-black transition cursor-pointer">
          View Status
        </p>
      </div>
    </div>
  );
}
