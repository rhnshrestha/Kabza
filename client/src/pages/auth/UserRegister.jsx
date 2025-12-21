import { useState } from "react";
import { userRegister } from "../../services/authService";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-black flex items-center justify-center p-6"
      style={{
        backgroundImage: "url('/table.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="bg-white p-10 rounded-2xl w-full max-w-md shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Full Name"
            className="w-full border rounded-xl px-4 py-3"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
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
            Register
          </button>
          <p>Already have account ? <a className="text-blue-800" href="/user-login">Login</a></p> 
        </form>
      </div>
    </div>
  );
}
