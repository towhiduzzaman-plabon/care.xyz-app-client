import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/services")
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        Our Care Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map(service => (
          <div key={service.slug} className="border rounded p-5 shadow">
            <h3 className="text-xl font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-600">{service.description}</p>
            <p className="mt-2 font-bold">৳{service.price} / hour</p>

            {/* ✅ THIS IS THE MOST IMPORTANT FIX */}
            <Link to={`/service/${service.slug}`}>
              <button className="mt-4 bg-black text-white px-4 py-2 rounded">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
