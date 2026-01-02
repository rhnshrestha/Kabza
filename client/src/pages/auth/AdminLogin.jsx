import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminLogin } from "../../services/authService"; 
import { setToken } from "../../utils/auth"; 

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await adminLogin(formData);
      if (res.data && res.data.token) {
        setToken(res.data.token);
        navigate("/admin/dashboard");
      } else {
        setError("Invalid administrative credentials.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Secure connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-6 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/table.jpg')" }}
    >
      {/* Heavy Overlay for "Back-Office" feel */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[3px]"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main Card */}
        <div className="bg-black/40 backdrop-blur-2xl p-10 rounded-[2rem] shadow-2xl border border-white/10 text-white">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-2xl mb-4 border border-blue-500/30">
              <span className="text-blue-400 text-3xl">🛡️</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter mb-2 uppercase italic">Admin Portal</h2>
            <p className="text-gray-400 text-xs tracking-widest uppercase">Management Access Only</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-200 text-xs py-3 px-4 rounded-xl mb-6 text-center animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-2 mb-2 block group-focus-within:text-blue-400 transition-colors">
                Internal Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="admin@rockybistro.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all"
                onChange={handleChange}
                required
              />
            </div>

            <div className="group">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-2 mb-2 block group-focus-within:text-blue-400 transition-colors">
                Security Key
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all"
                onChange={handleChange}
                required
              />
            </div>

            <button 
              disabled={loading}
              className={`w-full ${loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-900/40'} text-white font-bold py-4 rounded-2xl shadow-xl transform active:scale-[0.98] transition-all duration-200 mt-4 cursor-pointer tracking-widest uppercase text-sm`}
            >
              {loading ? "Authorizing..." : "Login to System"}
            </button>
          </form>
        </div>

        {/* Home Link */}
        <div className="text-center mt-8">
           <Link to="/" className="text-gray-500 text-[10px] uppercase tracking-[0.4em] hover:text-white transition duration-500">
             ← Exit Secure Portal
           </Link>
        </div>
      </div>
    </div>
  );
}