import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      "http://localhost:3000/api/payments/create-intent",
      { totalCost: 500 },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.paymentIntent.status === "succeeded") {
      alert("Payment Successful");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button className="btn">Pay Now</button>
    </form>
  );
};

export default CheckoutForm;
