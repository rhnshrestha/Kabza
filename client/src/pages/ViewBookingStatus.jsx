import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ViewBookingStatus() {
  const [contact, setContact] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8808/api/bookings/status", { contact });
      setBookings(res.data.data); 
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-start p-6 bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: "url('/table.jpg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

      <div className="relative z-10 w-full max-w-2xl mt-12">
        {/* Search Section */}
        <div className="bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Track Your Table</h2>
            <p className="text-gray-400 text-sm">Enter the phone number used during booking</p>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <input
              type="tel"
              placeholder="98XXXXXXXX"
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
              onChange={(e) => setContact(e.target.value)}
              required
            />
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-2xl transition-all active:scale-95">
              {loading ? "Searching..." : "Find Booking"}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {bookings.length > 0 ? (
            bookings.map((b, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:bg-white/15"
              >
                <div>
                  <h3 className="text-white font-bold text-lg">{b.customer_name}</h3>
                  <div className="flex flex-wrap gap-y-1 gap-x-4 mt-1">
                    <p className="text-gray-400 text-sm">
                      <span className="text-orange-500 mr-1">📅</span> {b.booking_date}
                    </p>
                    <p className="text-gray-400 text-sm">
                      <span className="text-orange-500 mr-1">⏰</span> {b.booking_time}
                    </p>
                    <p className="text-gray-400 text-sm">
                      <span className="text-orange-500 mr-1">👥</span> {b.people} People
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-auto flex flex-col items-end gap-2">
                  <div className="bg-black/30 px-4 py-2 rounded-xl border border-white/5 text-right">
                    <p className="text-[10px] uppercase tracking-widest text-gray-500">Table</p>
                    <p className="text-white font-mono">{b.Table?.table_no || "WAITING"}</p>
                  </div>
                  
                  <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                    b.BookingStatus?.status === 'Confirmed' 
                    ? 'border-green-500/50 text-green-400 bg-green-500/10' 
                    : 'border-orange-500/50 text-orange-400 bg-orange-500/10'
                  }`}>
                    {b.BookingStatus?.status || "Pending"}
                  </span>
                </div>
              </div>
            ))
          ) : !loading && contact && (
            <p className="text-center text-gray-500 italic mt-10">No reservations found for this number.</p>
          )}
        </div>

        {/* Home Link */}
        <div className="text-center mt-12">
           <Link to="/" className="text-gray-500 text-xs uppercase tracking-[0.3em] hover:text-white transition">
             ← Back to Home
           </Link>
        </div>
      </div>
    </div>
  );
}