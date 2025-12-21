import { useEffect, useState } from "react";
import axios from "axios";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8808/api/bookings")
      .then(res => setBookings(res.data.bookings))
      .catch(err => console.log(err));
  }, []);

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
                  <span className="px-2 py-1 rounded bg-yellow-200">
                    Pending
                  </span>
                </td>
                <td className="space-x-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded">
                    Confirm
                  </button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded">
                    Cancel
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
