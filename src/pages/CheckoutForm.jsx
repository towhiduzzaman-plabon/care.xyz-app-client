import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axiosSecure from "../utils/axiosSecure";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // axiosSecure automatically includes the access-token stored in localStorage
    const { data } = await axiosSecure.post("/payments/create-intent", {
      totalCost: 500,
    });

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
