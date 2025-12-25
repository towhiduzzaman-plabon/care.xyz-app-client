import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axiosSecure from "../utils/axiosSecure";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const Booking = () => {
  const { service_slug } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [service, setService] = useState(null);
  const [hours, setHours] = useState(1);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Load service by slug
  useEffect(() => {
    axiosSecure
      .get(`/services/${service_slug}`)
      .then(res => setService(res.data))
      .catch(() => {
        Swal.fire("Error", "Service not found", "error");
        navigate("/services");
      });
  }, [service_slug, navigate]);

  if (!service) return null;

  const totalCost = hours * service.price;

  // 🔹 Confirm booking
  const handleBooking = async () => {
    if (!location) {
      return Swal.fire("Required", "Please enter location", "warning");
    }

    const bookingData = {
      serviceSlug: service.slug,
      serviceName: service.name,
      userEmail: user.email,
      hours,
      location,
      totalCost,
      status: "Pending",
      createdAt: new Date(),
    };

    try {
      setLoading(true);
      await axiosSecure.post("/bookings", bookingData);

      Swal.fire({
        icon: "success",
        title: "Booking Successful",
        text: "Your booking is pending confirmation",
      });

      navigate("/my-bookings");
    } catch (err) {
      Swal.fire("Error", "Booking failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">
        Book {service.name}
      </h1>

      <div className="bg-white shadow rounded p-6 space-y-4">
        <div>
          <label className="font-medium">Duration (hours)</label>
          <input
            type="number"
            min="1"
            value={hours}
            onChange={e => setHours(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="font-medium">Location / Address</label>
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter full address"
          />
        </div>

        <div className="text-lg font-semibold">
          Total Cost: ৳{totalCost}
        </div>

        <button
          disabled={loading}
          onClick={handleBooking}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
};

export default Booking;
