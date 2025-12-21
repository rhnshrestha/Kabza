import { NavLink } from "react-router-dom";

const linkStyle =
  "block px-4 py-3 rounded-lg hover:bg-gray-800 transition";

export default function AdminNavbar() {
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
        <NavLink to="/admin/logout" className="block px-4 py-3 rounded-lg bg-red-600 mt-6">
          Logout
        </NavLink>
      </nav>
    </aside>
  );
}
