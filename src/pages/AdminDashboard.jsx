import { useEffect, useState } from "react";
import axiosSecure from "../utils/axiosSecure";
import Swal from "sweetalert2";
import StatusBadge from "../components/StatusBadge";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    try {
      const res = await axiosSecure.get("/admin/bookings");
      setBookings(res.data);
    } catch {
      Swal.fire("Error", "Failed to load bookings", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const confirmBooking = async (id) => {
    const confirm = await Swal.fire({
      title: "Confirm booking?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/admin/confirm/${id}`);

      // 🔥 UI sync
      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: "Confirmed" } : b
        )
      );

      Swal.fire("Confirmed", "Email sent to user", "success");
    } catch {
      Swal.fire("Error", "Confirmation failed", "error");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

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
                {b.hours} hrs | ৳{b.totalCost}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <StatusBadge status={b.status} />

              {b.status === "Pending" && (
                <button
                  onClick={() => confirmBooking(b._id)}
                  className="bg-green-600 text-white px-4 py-1 rounded"
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
