import { useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    // Client-side validation
    if (formData.newPassword !== formData.confirmPassword) {
      return setStatus({ type: "error", message: "New passwords do not match!" });
    }

    if (formData.newPassword.length < 6) {
      return setStatus({ type: "error", message: "Password must be at least 6 characters." });
    }

    setLoading(true);
    try {
      const token = getToken();
      const response = await axios.post(
        "http://localhost:8808/api/admin/change-password",
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStatus({ type: "success", message: response.data.message });
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.response?.data?.message || "Failed to update password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Security</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <h2 className="text-lg font-semibold text-gray-700">Change Password</h2>
          <p className="text-sm text-gray-500">Update your administrator credentials.</p>
        </div>

        <div className="p-8 bg-gray-50/50">
          {status.message && (
            <div
              className={`mb-6 p-4 rounded-lg text-sm font-bold border ${
                status.type === "success"
                  ? "bg-green-100 border-green-200 text-green-700"
                  : "bg-red-100 border-red-200 text-red-700"
              }`}
            >
              {status.type === "success" ? "✓ " : "✕ "}
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 ml-1">
                Current Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none bg-white transition-all"
                value={formData.oldPassword}
                onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 ml-1">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none bg-white transition-all"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 ml-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none bg-white transition-all"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full md:w-max px-8 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition shadow-lg active:scale-95 disabled:opacity-50`}
              >
                {loading ? "Updating..." : "Save New Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-orange-50 border border-orange-100 rounded-xl">
        <p className="text-xs text-orange-800 leading-relaxed">
          <strong>Note:</strong> Changing your password will not log you out of your current session, 
          but you will need to use your new password the next time you log in.
        </p>
      </div>
    </div>
  );
}