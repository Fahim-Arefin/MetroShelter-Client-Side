import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../components/CheckOutForm";

// Add publishable key
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PAYMENT_GATEWAY_PK
);

function Payment() {
  return (
    <div className="h-screen py-24 px-4 xl:px-24 overflow-y-scroll">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-[#f87060] via-[#f75e4d] to-[#e84a5f] text-transparent bg-clip-text">
          Payment
        </h1>
        <h3 className="text-[16px] text-[#181c23] ">Please give valid info</h3>
      </div>
      <div className="my-12 md:w-[60%] mx-auto bg-gray-100 rounded-md shadow-md p-12">
        <div className="text-3xl font-semibold my-5">Pay Your Bill</div>
        <Elements stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      </div>
    </div>
  );
}

export default Payment;
