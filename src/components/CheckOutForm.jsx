import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button from "./Button";
import { useState } from "react";
import useWishListAPI from "../hooks/API/useWishListAPI";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const { updatePayment } = useWishListAPI();

  // Mutations
  const mutation = useMutation({
    mutationFn: updatePayment,
    onSuccess: () => {
      Swal.fire({
        title: "Success",
        text: "Payment Added Successfully 🚩",
        icon: "success",
      });
      //   queryClient.invalidateQueries({ queryKey: ["properties", "email"] });
      navigate("/dashboard/properties");
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "Sorry, could not add your Payment ⛔",
        icon: "error",
      });
    },
  });

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      console.log("[error]", error);
    } else {
      setError("");
      console.log("[PaymentMethod]", paymentMethod);
      mutation.mutate({ id, transactionId: paymentMethod.id });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <Button
          primary
          outline
          className="px-3 py-2 rounded-md mt-6 mb-2 flex items-center space-x-2"
          type="submit"
          disabled={!stripe}
        >
          {mutation.isPending ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <div className="w-6 h-6 ">
              <img
                className="h-full w-full"
                src="https://img.icons8.com/ios-filled/50/card-in-use.png"
                alt="card-in-use"
              />
            </div>
          )}

          <span className="">
            {mutation.isPending ? "Paying..." : "Payment"}
          </span>
        </Button>
      </form>
      <div className="text-[#f87060]">{error}</div>
    </>
  );
};

export default CheckoutForm;
