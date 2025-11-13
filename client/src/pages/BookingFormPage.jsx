import { useState } from "react";

export default function BookingFormPage() {
  const [formData, setFormData] = useState({
    customer_name: "",
    contact: "",
    email: "",
    booking_date: "",
    booking_time: "",
    people: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // You can replace this with axios.post('/api/booking', formData)
    alert("Booking submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Book a Table 🍽️
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
              placeholder="Enter your name"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Contact Number
            </label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
              placeholder="e.g. 9800000000"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
              placeholder="you@example.com"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Booking Date
            </label>
            <input
              type="date"
              name="booking_date"
              value={formData.booking_date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Booking Time
            </label>
            <input
              type="time"
              name="booking_time"
              value={formData.booking_time}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          {/* People */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Number of People
            </label>
            <input
              type="number"
              name="people"
              value={formData.people}
              onChange={handleChange}
              min="1"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
              placeholder="e.g. 4"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-purple-500 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Confirm Booking
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          We’ll send you a confirmation email after submission.
        </p>
      </div>
    </div>
  );
}
