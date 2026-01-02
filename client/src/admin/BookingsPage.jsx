import { useEffect, useState } from "react";
import axios from "axios";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  // 1. Fetch bookings on load
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios.get("http://localhost:8808/api/bookings")
      .then(res => setBookings(res.data.bookings))
      .catch(err => console.error("Error fetching bookings:", err));
  };

  // 2. Function to update status (Confirm/Cancel)
  const updateStatus = async (id, newStatus) => {
    try {
      // Adjust the URL to match your backend route
      await axios.put(`http://localhost:8808/api/bookings/${id}`, { 
        status: newStatus 
      });
      
      // Update local state to show change immediately
      setBookings(prev => 
        prev.map(b => b.id === id ? { ...b, status: newStatus } : b)
      );
    } catch (err) {
      alert("Failed to update status");
      console.error(err);
    }
  };

  // 3. Placeholder for Table Allocation
  const handleAllocateTable = (id) => {
    const tableNum = prompt("Enter Table Number to allocate:");
    if (tableNum) {
      axios.put(`http://localhost:8808/api/bookings/${id}`, { table_id: tableNum })
        .then(() => fetchBookings()) // Refresh list
        .catch(err => console.log(err));
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Bookings</h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-3">Name</th>
              <th>Contact</th>
              <th>Date</th>
              <th>Time</th>
              <th>People</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings?.map((b) => (
              <tr key={b.id} className="border-b text-center">
                <td className="p-3">{b.customer_name}</td>
                <td>{b.contact}</td>
                <td>{b.booking_date}</td>
                <td>{b.booking_time}</td>
                <td>{b.people}</td>
                <td>
                  <span className={`px-2 py-1 rounded ${
                    b.status === 'Confirmed' ? 'bg-green-200' : 
                    b.status === 'Cancelled' ? 'bg-red-200' : 'bg-yellow-200'
                  }`}>
                    {b.status || "Pending"}
                  </span>
                </td>
                <td className="p-3 flex flex-wrap justify-center gap-2">
                  <button 
                    onClick={() => updateStatus(b.id, "Confirmed")}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    Confirm
                  </button>
                  <button 
                    onClick={() => updateStatus(b.id, "Cancelled")}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => handleAllocateTable(b.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    Table
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}