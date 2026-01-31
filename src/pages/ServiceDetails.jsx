import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../utils/axiosSecure";

const ServiceDetails = () => {
  const { id: slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/services/${slug}`)
      .then((res) => {
        setService(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Service not found");
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-bold">{error}</h2>
        <Link to="/services" className="text-blue-600 underline">
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
      <p className="mb-3">{service.description}</p>
      <p className="font-semibold mb-4">৳ {service.price} / hour</p>

      <Link to={`/booking/${service.slug}`}>
        <button className="bg-black text-white px-6 py-2 rounded">
          Book This Service
        </button>
      </Link>
    </div>
  );
};

export default ServiceDetails;
