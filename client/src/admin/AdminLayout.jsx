import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-black text-white flex">
      <AdminNavbar />
      <main className="flex-1 p-8 bg-gray-100 text-black">
        <Outlet />
      </main>
    </div>
  );
}
