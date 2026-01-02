import { useState } from "react";
import { userRegister } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function UserRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await userRegister(formData);
    navigate("/user-login");
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-6 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/table.jpg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-black/40 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/10 text-white">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Join the Club</h2>
            <p className="text-gray-400 text-sm">Create an account to start booking</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                name="username"
                placeholder="Full Name"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                onChange={handleChange}
                required
              />
            </div>

            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 rounded-2xl shadow-lg transform active:scale-[0.98] transition-all duration-200 mt-4">
              Create Account
            </button>

            <p className="text-center text-gray-400 mt-8 text-sm">
              Already have an account?{" "}
              <Link to="/user-login" className="text-orange-500 font-medium hover:underline decoration-2 underline-offset-4">
                Login
              </Link>
            </p> 
          </form>
        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-6">
           <Link to="/" className="text-gray-400 text-xs uppercase tracking-widest hover:text-white transition">
             ← Back to Home
           </Link>
        </div>
      </div>
    </div>
  );
}
