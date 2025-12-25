import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axiosSecure from "../utils/axiosSecure";

const Payment = ({ booking }) => {
  const stripe = useStripe();
  const elements = useElements();

  const pay = async () => {
    const { data } = await axiosSecure.post("/payments/create-intent", {
      amount: booking.total
    });

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.paymentIntent.status === "succeeded") {
      await axiosSecure.post("/payments/success", {
        bookingId: booking._id
      });
    }
  };

  return (
    <div>
      <CardElement />
      <button onClick={pay} className="btn">Pay</button>
    </div>
  );
};

export default Payment;
