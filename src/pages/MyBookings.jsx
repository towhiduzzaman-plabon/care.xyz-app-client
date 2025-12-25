import { useEffect, useState } from "react";
import axiosSecure from "../utils/axiosSecure";
import Swal from "sweetalert2";
import StatusBadge from "../components/StatusBadge";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 Load my bookings
  const loadBookings = async () => {
    try {
      const res = await axiosSecure.get("/bookings/my");
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

  // 🔹 Cancel booking
  const cancelBooking = async (id) => {
    const confirm = await Swal.fire({
      title: "Cancel this booking?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/bookings/cancel/${id}`);

      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: "Cancelled" } : b
        )
      );

      Swal.fire("Cancelled", "Booking cancelled successfully", "success");
    } catch {
      Swal.fire("Error", "Failed to cancel booking", "error");
    }
  };

  // 🔹 Go to payment page
  const handlePayment = (booking) => {
    navigate("/payment", { state: booking });
  };

  // =====================
  // UI STATES
  // =====================
  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500">Loading bookings...</p>
    );
  }

  if (bookings.length === 0) {
    return (
      <p className="text-center mt-20 text-gray-500">
        No bookings found
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8">My Bookings</h2>

      <div className="space-y-5">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="border rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white shadow-sm"
          >
            {/* LEFT INFO */}
            <div>
              <h4 className="text-lg font-semibold">
                {b.serviceName}
              </h4>

              <p className="text-sm text-gray-600 mt-1">
                Location: {b.location}
              </p>

              <p className="text-sm mt-1">
                Duration: {b.hours} hours
              </p>

              <p className="text-sm font-medium mt-1">
                Total: ৳{b.totalCost}
              </p>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-3 flex-wrap">
              <StatusBadge status={b.status} />

              {b.status === "Pending" && (
                <button
                  onClick={() => cancelBooking(b._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded"
                >
                  Cancel
                </button>
              )}

              {b.status === "Confirmed" && (
                <button
                  onClick={() => handlePayment(b)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded"
                >
                  Pay Now
                </button>
              )}

              {b.status === "Paid" && (
                <span className="text-green-600 font-medium">
                  Payment Completed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
