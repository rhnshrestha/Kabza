import { Routes, Route } from "react-router-dom";
import AdminLayout from "../admin/AdminLayout";
import AdminDashboard from "../admin/AdminDashboard";
import BookingsPage from "../admin/BookingsPage";
import TablesPage from "../admin/TablesPage"
import EventsPage from "../admin/EventsPage"





export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        {/* This matches /admin/dashboard */}
        <Route path="dashboard" element={ <AdminDashboard />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="tables" element={<TablesPage />} />
        <Route path="events" element={<EventsPage />} />
      </Route>
    </Routes>
  );
}