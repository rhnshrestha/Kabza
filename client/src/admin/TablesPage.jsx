import { useEffect, useState } from "react";
import axios from "axios";

export default function TablesPage() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    table_no: "",
    capacity: "",
    status: "Available",
  });

  const API_URL = "http://localhost:8808/api/table";

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = () => {
    setLoading(true);
    axios.get(API_URL)
      .then((res) => {
        setTables(res.data.tables || res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tables:", err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this table?")) {
      axios.delete(`${API_URL}/${id}`)
        .then(() => fetchTables())
        .catch((err) => console.error("Delete failed:", err));
    }
  };

  const handleEdit = (table) => {
    setFormData({
      table_no: table.table_no,
      capacity: table.capacity,
      status: table.status,
    });
    setCurrentId(table.id); // Note: Assuming DB uses 'id' based on your .map(t.id)
    setIsEditing(true);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      table_no: formData.table_no,
      capacity: formData.capacity,
      status: formData.status,
    };

    if (isEditing) {
      axios.patch(`${API_URL}/${currentId}`, payload)
        .then(() => {
          resetForm();
          fetchTables();
        })
        .catch((err) => console.error("Update failed:", err));
    } else {
      axios.post(API_URL, payload)
        .then(() => {
          resetForm();
          fetchTables();
        })
        .catch((err) => console.error("Add failed:", err));
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ table_no: "", capacity: "", status: "Available" });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Tables</h1>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
        >
          {showForm ? "Close" : "+ Add Table"}
        </button>
      </div>

      {/* Inline Form */}
      {showForm && (
        <div className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            {isEditing ? "Edit Table Details" : "Add New Table"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Table No (e.g. T-01)"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.table_no}
              onChange={(e) => setFormData({ ...formData, table_no: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Capacity"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              required
            />
            <select
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              {isEditing ? "Update" : "Save"}
            </button>
          </form>
        </div>
      )}

      {/* Table Display */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider">Table No</th>
              <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider">Capacity</th>
              <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
              <th className="p-4 text-center text-xs font-semibold uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-center md:text-left">
            {loading ? (
              <tr><td colSpan="4" className="p-10 text-center text-gray-400">Loading tables...</td></tr>
            ) : tables.length === 0 ? (
              <tr><td colSpan="4" className="p-10 text-center text-gray-400">No tables configured.</td></tr>
            ) : (
              tables.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-bold text-gray-800">{t.table_no}</td>
                  <td className="p-4 text-gray-600">{t.capacity} Persons</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      t.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {t.status || "Available"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(t)}
                        className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-xs font-semibold hover:bg-blue-700 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
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