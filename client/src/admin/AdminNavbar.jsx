import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

const linkStyle =
  "block px-4 py-3 rounded-lg hover:bg-gray-800 transition";


export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () =>{
    logout();
    navigate("/");
    
  }
  return (
    <aside className="w-64 bg-black p-6">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      <nav className="space-y-2">
        <NavLink to="/admin/dashboard" className={linkStyle}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/bookings" className={linkStyle}>
          Bookings
        </NavLink>
        <NavLink to="/admin/tables" className={linkStyle}>
          Tables
        </NavLink>
        <NavLink to="/admin/events" className={linkStyle}>
          Events
        </NavLink>
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-3 rounded-lg bg-red-600 mt-6 hover:bg-red-700 transition cursor-pointer"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
