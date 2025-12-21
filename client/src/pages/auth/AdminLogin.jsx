import { useState } from "react";
import { adminLogin } from "../../services/authService";
import { setToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const res = await adminLogin(formData);

    if (res.data && res.data.token) {
      setToken(res.data.token); 
      navigate("/admin/dashboard");
    } else {
      alert("Login failed. Please check your credentials.");
    }
  
};

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6"
      style={{
        backgroundImage: "url('/table.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="bg-white p-10 rounded-2xl w-full max-w-md shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            placeholder="Admin Email"
            className="w-full border rounded-xl px-4 py-3"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border rounded-xl px-4 py-3"
            onChange={handleChange}
          />

          <button className="w-full bg-black text-white py-3 rounded-xl">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
