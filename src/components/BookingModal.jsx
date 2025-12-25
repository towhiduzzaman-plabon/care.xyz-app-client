const BookingModal = ({ booking, close }) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded">
        <h3 className="font-bold text-lg">{booking.serviceName}</h3>
        <p>Duration: {booking.duration} hrs</p>
        <p>Total: ৳{booking.totalCost}</p>
        <p>Status: {booking.status}</p>
        <button onClick={close} className="mt-4 px-4 py-1 bg-gray-800 text-white">
          Close
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
