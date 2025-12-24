import { useState } from "react";
import axios from "axios";

export default function ViewBookingStatus() {
  const [contact, setContact] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Note: We use .post because your route is .post()
      const res = await axios.post("http://localhost:8808/api/bookings/status", { contact });
      setBookings(res.data.data); // This is the array we added to your backend
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Check Your Booking</h2>
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter Phone Number"
          className="border p-2 flex-1 rounded"
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <button className="bg-black text-white px-4 py-2 rounded">
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="space-y-4">
        {bookings.map((b, index) => (
          <div key={index} className="p-4 border rounded-lg bg-gray-50">
            <p><strong>Name:</strong> {b.customer_name}</p>
            <p><strong>Date:</strong> {b.booking_date} at {b.booking_time}</p>
            <p><strong>People:</strong> {b.people}</p>
            <p><strong>Table:</strong> {b.Table?.table_no || "Assigning Soon"}</p>
            <p>
              <strong>Status: </strong> 
              <span className="font-bold text-blue-600">
                {b.BookingStatus?.status || "Pending"}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}