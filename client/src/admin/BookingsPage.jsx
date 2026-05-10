import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    setLoading(true);
    axios.get("http://localhost:8808/api/bookings")
      .then(res => {
        setBookings(res.data.bookings || res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  };

  const handleStatusUpdate = async (id, statusId) => {
    try {
      const token = getToken();
      await axios.patch(
        `http://localhost:8808/api/bookings/${id}/status`, 
        { status_id: statusId },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      fetchBookings(); 
    } catch (err) {
      console.error("Status update failed:", err);
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Bookings Management</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-black text-white uppercase text-xs">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Date & Time</th>
              <th className="p-4 text-center">People</th>
              {/* Added Table Number Column */}
              <th className="p-4 text-center">Table No</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan="7" className="p-10 text-center text-gray-400">Loading bookings...</td></tr>
            ) : bookings.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-800">{b.customer_name}</td>
                <td className="p-4 text-gray-600">{b.contact}</td>
                <td className="p-4 text-gray-600">
                  {b.booking_date} | {b.booking_time}
                </td>
                <td className="p-4 text-center text-gray-600">{b.people}</td>
                
                {/* Displaying Table Number (e.g., T1, T2) */}
                <td className="p-4 text-center">
                  {b.table ? (
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded font-bold border border-blue-100">
                      {b.table.table_no}
                    </span>
                  ) : (
                    <span className="text-gray-300 italic text-xs">Not Assigned</span>
                  )}
                </td>

                <td className="p-4 text-center">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    b.status_id === 1 ? 'bg-green-100 text-green-700' : 
                    b.status_id === 2 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {b.status_id === 1 ? "Confirmed" : b.status_id === 2 ? "Cancelled" : "Pending"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    {b.status_id !== 1 && b.status_id !== 2 && (
                      <button 
                        onClick={() => handleStatusUpdate(b.id, 1)}
                        className="bg-green-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-green-700 transition"
                      >
                        Confirm
                      </button>
                    )}
                    
                    {b.status_id !== 2 && (
                      <button 
                        onClick={() => handleStatusUpdate(b.id, 2)}
                        className="bg-red-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-red-700 transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}