import { useEffect, useState } from "react";
import axiosSecure from "../utils/axiosSecure";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Load all bookings
  const loadBookings = async () => {
    try {
      const res = await axiosSecure.get("/admin/bookings");
      setBookings(res.data);
    } catch (err) {
      Swal.fire("Error", "Failed to load bookings", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // 🔹 Confirm booking
  const confirmBooking = async (id) => {
    try {
      await axiosSecure.patch(`/admin/confirm/${id}`);

      Swal.fire({
        icon: "success",
        title: "Booking Confirmed",
        text: "Email invoice sent to user",
        timer: 1500,
        showConfirmButton: false,
      });

      // 🔁 UI sync
      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: "Confirmed" } : b
        )
      );
    } catch (err) {
      Swal.fire("Error", "Confirm failed", "error");
    }
  };

  // 🔹 Revenue calculation
  const totalRevenue = bookings
    .filter((b) => b.status === "Paid" || b.status === "Confirmed")
    .reduce((sum, b) => sum + (b.totalCost || 0), 0);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      {/* 🔹 Stats */}
      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="bg-gray-900 text-white p-6 rounded">
          <h3 className="text-lg">Total Bookings</h3>
          <p className="text-2xl font-bold">{bookings.length}</p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded">
          <h3 className="text-lg">Total Revenue</h3>
          <p className="text-2xl font-bold">৳{totalRevenue}</p>
        </div>
      </div>

      {/* 🔹 Booking list */}
      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="border rounded p-5 flex justify-between items-center"
          >
            <div>
              <h4 className="font-semibold">{b.serviceName}</h4>
              <p className="text-sm text-gray-600">{b.userEmail}</p>
              <p className="text-sm">
                Duration: {b.duration} hrs | ৳{b.totalCost}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Status Badge */}
              <span
                className={`px-3 py-1 rounded text-sm font-medium ${
                  b.status === "Pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : b.status === "Confirmed"
                    ? "bg-blue-200 text-blue-800"
                    : b.status === "Paid"
                    ? "bg-green-200 text-green-800"
                    : "bg-gray-200"
                }`}
              >
                {b.status}
              </span>

              {/* Confirm Button */}
              {b.status === "Pending" && (
                <button
                  onClick={() => confirmBooking(b._id)}
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                  Confirm
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
