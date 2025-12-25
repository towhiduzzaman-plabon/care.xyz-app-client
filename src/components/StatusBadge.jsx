const StatusBadge = ({ status }) => {
  const colors = {
    Pending: "bg-yellow-500",
    Confirmed: "bg-blue-600",
    Paid: "bg-green-600",
    Cancelled: "bg-red-600",
  };

  return (
    <span
      className={`text-white text-sm px-3 py-1 rounded ${colors[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
