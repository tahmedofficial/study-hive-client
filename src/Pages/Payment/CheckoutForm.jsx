import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../Hooks/useAuth";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import WaitModal from "../../Components/WaitModal/WaitModal";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ session, onClose }) => {

    const { user, sweetMessage, errorMessage } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState("");
    const [isFinihs, setFinish] = useState(false);
    const navigate = useNavigate();

    const { _id, tutorEmail, title, registrationFee: price } = session;


    useEffect(() => {
        if (price) {
            axiosSecure.post("/create-payment-intent", {
                price: price
            })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, price])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFinish(true);

        if (!stripe || !elements) {
            return setFinish(false);
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return setFinish(false);
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        })

        if (error) {
            setFinish(false);
            return errorMessage(error.message);
        }
        else {
            console.log("Payment method", paymentMethod);
        }

        // Confirm Payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous"
                }
            }
        })

        if (confirmError) {
            setFinish(false);
            // errorMessage(confirmError);
        }
        else {
            if (paymentIntent.status === "succeeded") {
                const booking = {
                    sessionId: _id,
                    studentEmail: user?.email,
                    tutorEmail: tutorEmail,
                    transactionId: paymentIntent.id
                }

                axiosSecure.post("/booked", booking)
                    .then(res => {
                        if (res.data.insertedId) {
                            onClose();
                            setFinish(false);
                            navigate("/allSessions");
                            return sweetMessage(`You have Successfully Book ${title}`)
                        }
                        errorMessage("You have already Book this session")
                    })

            }
            setFinish(false);
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn bg-primary_color flex mx-auto text-white px-10 mt-8" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            <div>
                {isFinihs ? <WaitModal message="Payment Checking"></WaitModal> : undefined}
            </div>
        </div>
    );
};

export default CheckoutForm;

CheckoutForm.propTypes = {
    session: PropTypes.object,
    onClose: PropTypes.func
}