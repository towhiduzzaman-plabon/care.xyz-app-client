import { useEffect, useState } from "react";
import axiosSecure from "../utils/axiosSecure";
import { Helmet } from "react-helmet-async";

// recharts (SAFE imports)
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
  });

  useEffect(() => {
    axiosSecure.get("/bookings/my").then((res) => {
      const bookings = res.data;

      const total = bookings.length;
      const pending = bookings.filter(b => b.status === "Pending").length;
      const confirmed = bookings.filter(b => b.status === "Confirmed").length;
      const cancelled = bookings.filter(b => b.status === "Cancelled").length;

      setStats({ total, pending, confirmed, cancelled });
    });
  }, []);

  const barData = [
    { name: "Pending", value: stats.pending },
    { name: "Confirmed", value: stats.confirmed },
    { name: "Cancelled", value: stats.cancelled },
  ];

  const pieData = [
    { name: "Pending", value: stats.pending },
    { name: "Confirmed", value: stats.confirmed },
    { name: "Cancelled", value: stats.cancelled },
  ];

  const COLORS = ["#facc15", "#22c55e", "#ef4444"];

  return (
    <>
      <Helmet>
        <title>Dashboard | Care.xyz</title>
      </Helmet>

      <section className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-3xl font-bold mb-10">User Dashboard</h1>

          {/* ===== Stats Cards ===== */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card title="Total Bookings" value={stats.total} />
            <Card title="Pending" value={stats.pending} />
            <Card title="Confirmed" value={stats.confirmed} />
            <Card title="Cancelled" value={stats.cancelled} />
          </div>

          {/* ===== Charts ===== */}
          <div className="grid md:grid-cols-2 gap-10">
            
            {/* Bar Chart */}
            <div className="bg-white p-6 rounded shadow">
              <h3 className="font-semibold mb-4">Booking Status (Bar)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0f172a" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white p-6 rounded shadow">
              <h3 className="font-semibold mb-4">Booking Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white p-6 rounded shadow text-center">
    <h3 className="text-gray-600">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default Dashboard;
