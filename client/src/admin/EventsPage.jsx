import { useEffect, useState } from "react";
import axios from "axios";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    event_name: "",
    event_date: "",
    event_description: "",
  });

  const API_URL = "http://localhost:8808/api/event";

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    setLoading(true);
    axios
      .get(API_URL)
      .then((res) => {
        setEvents(res.data.events || res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this event?")) {
      axios
        .delete(`${API_URL}/${id}`)
        .then(() => fetchEvents())
        .catch((err) => console.error("Delete failed:", err));
    }
  };

  const handleEdit = (event) => {
    const formattedDate = new Date(event.event_date)
      .toISOString()
      .split("T")[0];
    setFormData({
      event_name: event.event_name,
      event_date: formattedDate,
      event_description: event.event_description,
    });
    setCurrentId(event.event_id);
    setIsEditing(true);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make sure we are sending the object the backend expects
    const payload = {
      event_name: formData.event_name,
      event_date: formData.event_date,
      event_description: formData.event_description,
    };

    if (isEditing) {
      axios
        .patch(`${API_URL}/${currentId}`, payload)
        .then(() => {
          resetForm();
          fetchEvents();
        })
        .catch((err) => console.error("Update failed:", err));
    } else {
      // POST request for new records
      axios
        .post(API_URL, payload)
        .then(() => {
          resetForm();
          fetchEvents();
        })
        .catch((err) => console.error("Add failed:", err));
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ event_name: "", event_date: "", event_description: "" });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Special Events</h1>
        <button
          onClick={() => {
            if (showForm) resetForm();
            else setShowForm(true);
          }}
          className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
        >
          {showForm ? "Close" : "+ Add Event"}
        </button>
      </div>

      {/* Inline Form (Matches Bookings Minimalist Style) */}
      {showForm && (
        <div className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            {isEditing ? " Edit Event" : " Create New Event"}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <input
              type="text"
              placeholder="Event Name"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.event_name}
              onChange={(e) =>
                setFormData({ ...formData, event_name: e.target.value })
              }
              required
            />
            <input
              type="date"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.event_date}
              onChange={(e) =>
                setFormData({ ...formData, event_date: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Description"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.event_description}
              onChange={(e) =>
                setFormData({ ...formData, event_description: e.target.value })
              }
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              {isEditing ? "Update Event" : "Save Event"}
            </button>
          </form>
        </div>
      )}

      {/* Table (Strictly matches BookingsPage) */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto border border-gray-100">
        <table className="w-full">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider">
                Name
              </th>
              <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider">
                Date
              </th>
              <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider">
                Description
              </th>
              <th className="p-4 text-center text-xs font-semibold uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="4" className="p-10 text-center text-gray-400">
                  Loading events...
                </td>
              </tr>
            ) : events.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-10 text-center text-gray-400">
                  No events found.
                </td>
              </tr>
            ) : (
              events.map((e) => (
                <tr key={e.event_id} className="hover:bg-gray-50 transition">
                  <td className="p-4 text-gray-800 font-medium">
                    {e.event_name}
                  </td>
                  <td className="p-4 text-gray-600">
                    {new Date(e.event_date).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-4 text-gray-500 text-sm">
                    {e.event_description || "—"}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(e)}
                        className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-xs font-semibold hover:bg-blue-700 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(e.event_id)}
                        className="bg-red-600 text-white px-4 py-1.5 rounded-md text-xs font-semibold hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
